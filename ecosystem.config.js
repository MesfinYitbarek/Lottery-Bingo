module.exports = {
  apps: [
    {
      name: 'BINGO',
      script: 'npm',
      args: 'start',
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
      out_file: './logs/output.log',   // Log standard output to a file
      log_date_format: 'YYYY-MM-DD HH:mm Z', // Format for log timestamps
      restart_delay: 5000, // Delay between restarts (in milliseconds)
      max_restarts: 7, // Maximum number of restarts before PM2 stops trying
      instances: 'max', // Use all available CPU cores
      exec_mode: 'fork',
    },
  ],
};