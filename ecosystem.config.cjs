module.exports = {
  apps: [
    {
      name: 'BINGO',
      script: '/dist/index.js',
   
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      error_file: './logs/error.log',
      out_file: './logs/output.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      restart_delay: 5000,
      max_restarts: 10,
      instances: 'max',
      exec_mode: 'cluster',
    },
  ],
};