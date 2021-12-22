import path from 'path';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { fastify, FastifyInstance, FastifyPluginOptions } from 'fastify';
import swaggerUI from 'fastify-swagger';

import userRoutes from './resources/users/user.router';
import taskRoutes from './resources/task/task.router';
import boardRoutes from './resources/board/board.router';

/**
 * @param options - fastify plugin options
 * @returns fastify instance
 * */

const build = (
  options: FastifyPluginOptions = {}
): FastifyInstance<Server, IncomingMessage, ServerResponse> => {
  const app: FastifyInstance<Server, IncomingMessage, ServerResponse> =
    fastify(options);

  // app.addHook('preHandler', (req, reply, done) => {
  //   if (req.body) req.log.info({ body: req.body }, 'parsed body');
  //   done();
  // });

  app.register(swaggerUI, {
    exposeRoute: true,
    routePrefix: '/doc',
    mode: 'static',
    specification: {
      path: path.join(__dirname, '../doc/api.yaml'),
      baseDir: __dirname,
    },
  });

  app.register(userRoutes, { prefix: '/users' });
  app.register(boardRoutes, { prefix: '/boards' });
  app.register(taskRoutes, { prefix: '/boards/:boardId/tasks' });

  return app;
};

export default build;
