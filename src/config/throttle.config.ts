const ttl = 60_000; // 限流窗口：1 分钟

export const THROTTLE_TTL = ttl;
export const THROTTLE_LIMIT = Number(process.env.THROTTLE_LIMIT ?? 120); // 全局默认：每 IP 每分钟 120 次
export const AUTH_THROTTLE_LIMIT = Number(
  process.env.AUTH_THROTTLE_LIMIT ?? 10,
); // 登录接口：每 IP 每分钟 10 次
