module.exports = {
  apps: [
    {
      name: 'BINGO',
      script: 'index.html',
      args:'start',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      error_file: './logs/error.log', // Log errors to a file
      out_file: './logs/output.log',   
      log_date_format: 'YYYY-MM-DD HH:mm Z', // Format for log timestamps
      restart_delay: 5000, // Delay between restarts (in milliseconds)
      max_restarts: 10, // Maximum number of restarts before PM2 stops trying
      instances: 'max', // Use all available CPU cores
      exec_mode: 'cluster',
    },
  ],
};