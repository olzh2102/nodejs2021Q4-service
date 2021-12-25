import path from 'path';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { fastify, FastifyInstance, FastifyPluginOptions } from 'fastify';
import swaggerUI from 'fastify-swagger';

import log from './logger/logger';

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

  app.addHook('preHandler', (req, _, done) => {
    if (req.body) req.log.info({ body: req.body }, 'parsed body');
    done();
  });

  app.setErrorHandler((err, req, reply) => {
    log.error(err);

    if (reply.statusCode >= 400 && reply.statusCode < 500) {
      app.log.info(err.message);
    }

    app.log.error(err.message);
  });

  process.on('uncaughtException', (err: Error, origin: string) => {
    log.fatal(err, 'uncaughtException', { origin });

    setTimeout(() => {
      process.exit(1);
    }, 500);
  });

  return app;
};

export default build;
