import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import {
  getUsers,
  getSingleUser,
  addUser,
  removeUser,
  updateUser,
} from './user.service';

/**
 * creates routes REST endpoint for users resources
 *
 * @param fastify - fastify server instance
 * @param options - fastify options
 * @param done - callback function to call after registering all routes to continue
 */

function router(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
): void {
  fastify.get('/', getUsers);
  fastify.get('/:userId', getSingleUser);
  fastify.post('/', addUser);
  fastify.delete('/:userId', removeUser);
  fastify.put('/:userId', updateUser);

  done();
}

export default router;
