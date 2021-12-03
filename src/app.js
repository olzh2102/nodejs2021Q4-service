// const swaggerUI = require('swagger-ui-express');
// const YAML = require('yamljs');

const fastify = require('fastify');

const userRoutes = require('./resources/users/user.router');
const boardRoutes = require('./resources/board/board.router');
const taskRoutes = require('./resources/task/task.router');

const build = (options = {}) => {
  const app = fastify(options);

  app.register(userRoutes);
  app.register(boardRoutes);
  app.register(taskRoutes);

  return app;
};

module.exports = {
  build,
};
