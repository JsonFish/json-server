import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { randomBytes } from 'node:crypto';

// 允许用 ENV_FILE 指定环境文件，方便 PM2 / systemd 区分 .env.production 等。
const envFileName = process.env.ENV_FILE ?? '.env';
const envFile = resolve(process.cwd(), envFileName);

if (existsSync(envFile)) {
  process.loadEnvFile(envFile);
} else if (process.env.NODE_ENV === 'production') {
  throw new Error(
    `生产环境未找到环境文件 ${envFileName}，已拒绝启动。可通过 ENV_FILE 指定其他文件路径。`,
  );
}

export const isProduction = process.env.NODE_ENV === 'production';

// 同一个变量多次读取时返回同一个值，避免随机兜底密钥前后不一致。
const overrides = new Map<string, string>();

/**
 * 读取敏感配置。
 *
 * 生产环境缺失时直接抛错终止启动 —— 这是刻意的：宁可服务起不来，
 * 也不能带着占位密钥上线。非生产环境则生成随机临时值，保证本地开发开箱即用
 * （代价是进程重启后已签发的 token 全部失效）。
 */
export function requireSecret(name: string): string {
  const cached = overrides.get(name);
  if (cached) return cached;

  const value = process.env[name]?.trim();
  if (value) return value;

  if (isProduction) {
    throw new Error(
      `缺少必需的环境变量 ${name}，已拒绝启动。请在 ${envFileName} 中配置后重启。`,
    );
  }

  const fallback = randomBytes(32).toString('hex');
  console.warn(
    `[env] 未配置 ${name}，已生成临时随机值；进程重启后已签发的 token 会全部失效。`,
  );
  overrides.set(name, fallback);

  return fallback;
}

/**
 * 读取敏感配置，缺失时在生产环境抛错、非生产环境返回空串。
 * 适用于「缺失时业务可以明确拒绝」的场景（例如第三方 OAuth 登录）。
 */
export function optionalSecret(name: string): string {
  const value = process.env[name]?.trim();
  if (value) return value;

  if (isProduction) {
    throw new Error(
      `缺少必需的环境变量 ${name}，已拒绝启动。请在 ${envFileName} 中配置后重启。`,
    );
  }

  return '';
}

/**
 * 解析 CORS 白名单。生产环境强制显式配置且不允许通配符，
 * 避免未配置时静默回退到 localhost 造成「以为放开了其实没放开」。
 */
export function resolveCorsOrigins(): string[] {
  const raw = process.env.CORS_ORIGIN?.trim();

  if (!raw) {
    if (isProduction) {
      throw new Error(
        '生产环境必须配置 CORS_ORIGIN（多个来源用英文逗号分隔），例如 https://blog.example.com。',
      );
    }

    return ['http://localhost:3000'];
  }

  const origins = raw
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (!origins.length) {
    throw new Error('CORS_ORIGIN 解析后为空，请检查配置是否包含多余的分隔符。');
  }

  if (isProduction && origins.includes('*')) {
    throw new Error(
      '生产环境不允许 CORS_ORIGIN 使用通配符 *，请显式列出前端域名。',
    );
  }

  return origins;
}
