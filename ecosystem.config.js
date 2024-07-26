module.exports = {
    apps : [
      {
        name      : 'BINGO',
        script    : 'npm',
        args      : 'start',
        env: {
          NODE_ENV: 'production'
        },
        autorestart: true,
        watch: true
      }
    ]
  };