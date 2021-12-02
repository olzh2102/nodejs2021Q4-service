// const swaggerUI = require('swagger-ui-express');
// const YAML = require('yamljs');

const fastify = require('fastify');

const userRoutes = require('./resources/users/user.router');
const boardRoutes = require('./resources/board/board.router');

const build = (options = {}) => {
  const app = fastify(options);

  userRoutes.forEach((route) => app.route(route));
  boardRoutes.forEach((route) => app.route(route));

  return app;
};

module.exports = {
  build,
};
