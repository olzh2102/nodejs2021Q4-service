import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import schema from './user.schema';
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
  fastify.get(
    '/:userId',
    { schema: { params: schema.params, response: schema.response } },
    getSingleUser
  );
  fastify.post(
    '/',
    { schema: { body: schema.body, response: schema.response } },
    addUser
  );
  fastify.delete('/:userId', { schema: { params: schema.params } }, removeUser);
  fastify.put(
    '/:userId',
    {
      schema: {
        body: schema.body,
        params: schema.params,
        response: schema.response,
      },
    },
    updateUser
  );

  done();
}

export default router;
