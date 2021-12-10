import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify';

const {
  getTasks,
  getSingleTask,
  addTask,
  removeTask,
  updateTask,
} = require('./task.controller');

function router(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: (err?: FastifyError) => void
): void {
  fastify.get('/', getTasks);
  fastify.post('/', addTask);
  fastify.get('/:taskId', getSingleTask);
  fastify.delete('/:taskId', removeTask);
  fastify.put('/:taskId', updateTask);

  done();
}

module.exports = router;
