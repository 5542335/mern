const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    proxy('/api', {
      changeOrigin: true,
      target: 'http://localhost:5000',
    }),
  );
};
