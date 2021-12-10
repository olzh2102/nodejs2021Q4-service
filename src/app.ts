import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

const path = require('path');
const fastify = require('fastify');
const swaggerUI = require('fastify-swagger');

const userRoutes = require('./resources/users/user.router');
const boardRoutes = require('./resources/board/board.router');
const taskRoutes = require('./resources/task/task.router');

const build = (
  options: FastifyPluginOptions = {}
): FastifyInstance<Server, IncomingMessage, ServerResponse> => {
  const app: FastifyInstance<Server, IncomingMessage, ServerResponse> =
    fastify(options);

  app.register(swaggerUI, {
    exposeRoute: true,
    routePrefix: '/doc',
    mode: 'static',
    specification: {
      path: path.join(__dirname, '../doc/api.yaml'),
    },
  });

  app.register(userRoutes, { prefix: '/users' });
  app.register(boardRoutes, { prefix: '/boards' });
  app.register(taskRoutes, { prefix: '/boards/:boardId/tasks' });

  return app;
};

export default build;
