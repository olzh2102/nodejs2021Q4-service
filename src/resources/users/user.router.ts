import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import {
  getUsers,
  getSingleUser,
  addUser,
  removeUser,
  updateUser,
} from './user.service';

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
