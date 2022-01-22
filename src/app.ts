import path from 'path';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { fastify, FastifyInstance, FastifyPluginOptions } from 'fastify';
import { createConnection } from 'typeorm';
import swaggerUI from 'fastify-swagger';
import fastifyJWT from 'fastify-jwt';

import ormConfig from './ormconfig';
import log from './logger/logger';
import {
  handleUncaughtExceptions,
  handleUnhandledRejection,
} from './common/utils';

import authenticate from './common/authenticate';

import userRoutes from './resources/users/user.router';
import taskRoutes from './resources/task/task.router';
import boardRoutes from './resources/board/board.router';

/**
 * @param options - fastify plugin options
 * @returns fastify instance
 * */

const build = async (
  options: FastifyPluginOptions = {}
): Promise<FastifyInstance<Server, IncomingMessage, ServerResponse>> => {
  const app: FastifyInstance<Server, IncomingMessage, ServerResponse> =
    fastify(options);

  handleUncaughtExceptions(log);
  handleUnhandledRejection(log);

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

  app.register(fastifyJWT, { secret: process.env.JWT_SECRET_KEY as string });
  app.addHook('preValidation', authenticate);

  const db = await createConnection(ormConfig);
  app.decorate('db', db);

  app.addHook('preHandler', (req, _, done) => {
    if (req.body) req.log.info({ body: req.body }, 'parsed body');
    done();
  });

  app.setErrorHandler((err, req, reply) => {
    log.error(err);

    if (reply.statusCode >= 400 && reply.statusCode < 500) {
      app.log.info({ name: err.name, message: err.message });
      return;
    }

    app.log.error(err.message);
  });

  return app;
};

export default build;
