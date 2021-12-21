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

  const now = () => Date.now();

  app.addHook('onRequest', (req, reply, done) => {
    req.log.info({ url: req.raw.url, id: req.id }, 'received request');
    done();
  });

  app.addHook('onResponse', (req, reply, done) => {
    req.log.info(
      {
        url: req.raw.url, // add url to response as well for simple correlating
        statusCode: reply.raw.statusCode,
        durationMs: now(), // recreate duration in ms - use process.hrtime() - https://nodejs.org/api/process.html#process_process_hrtime_bigint for most accuracy
      },
      'request completed'
    );
    done();
  });

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
