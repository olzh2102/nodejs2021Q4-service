import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify';

const {
  getUsers,
  getSingleUser,
  addUser,
  removeUser,
  updateUser,
} = require('./user.service');

function router(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: (err?: FastifyError) => void
): void {
  fastify.get('/', getUsers);
  fastify.get('/:userId', getSingleUser);
  fastify.post('/', addUser);
  fastify.delete('/:userId', removeUser);
  fastify.put('/:userId', updateUser);

  done();
}

module.exports = router;
