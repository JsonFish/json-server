/**
 * PM2 进程配置：node scripts/deploy.sh 或 pm2 start ecosystem.config.js
 *
 * 注意：密钥不要写在这里 —— 本文件是进 git 的。
 * 应用通过 ENV_FILE 指向的环境文件读取配置（见 src/config/env.ts）。
 */
module.exports = {
  apps: [
    {
      name: 'json-server',
      script: 'dist/main.js',
      cwd: __dirname,

      // 集群模式按核数起进程。注意每个进程会各建一个 MySQL 连接池，
      // 需保证 instances × DB_POOL_SIZE < MySQL 的 max_connections。
      // 内存紧张或 API 负载不高的博客站点，设 1 也可以（instances: 1, exec_mode: 'fork'）。
      instances: Number(process.env.PM2_INSTANCES || 2),
      exec_mode: 'cluster',

      env: {
        NODE_ENV: 'production',
        ENV_FILE: '.env.production',
        PORT: process.env.PORT || 3001,
      },

      // 优雅退出：配合 app.enableShutdownHooks()，留足时间让 TypeORM 关闭连接池。
      kill_timeout: 10000,
      listen_timeout: 10000,
      wait_ready: false,

      // 日志落盘，配合 pm2-logrotate 做轮转，防止撑爆磁盘。
      time: true,
      merge_logs: true,
      out_file: 'logs/out.log',
      error_file: 'logs/error.log',

      max_memory_restart: '400M',
    },
  ],
};
