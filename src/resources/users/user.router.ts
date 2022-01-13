import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import {
  oneUserSchema,
  newUserSchema,
  updateUserSchema,
  deleteUserSchema,
} from './user.schema';
import {
  getUsers,
  getSingleUser,
  addUser,
  removeUser,
  updateUser,
} from './user.service';

/**
 * creates routes REST endpoint for users resource
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
  fastify.get('/:userId', oneUserSchema, getSingleUser);
  fastify.post('/', newUserSchema, addUser);
  fastify.delete('/:userId', deleteUserSchema, removeUser);
  fastify.put('/:userId', updateUserSchema, updateUser);

  done();
}

export default router;
