const path = require('path');
const fastify = require('fastify');
const swaggerUI = require('fastify-swagger');

const userRoutes = require('./resources/users/user.router');
const boardRoutes = require('./resources/board/board.router');
const taskRoutes = require('./resources/task/task.router');

const build = (options = {}) => {
  const app = fastify(options);

  app.register(swaggerUI, {
    exposeRoute: true,
    routePrefix: '/doc',
    mode: 'static',
    specification: {
      path: path.join(__dirname, '../doc/api.yaml'),
    },
  });

  app.register(userRoutes);
  app.register(boardRoutes);
  app.register(taskRoutes, { prefix: '/boards/:boardId' });

  return app;
};

module.exports = {
  build,
};
