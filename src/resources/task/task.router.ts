import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import {
  getTasks,
  getSingleTask,
  addTask,
  removeTask,
  updateTask,
} from './task.service';

function router(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
): void {
  fastify.get('/', getTasks);
  fastify.post('/', addTask);
  fastify.get('/:taskId', getSingleTask);
  fastify.delete('/:taskId', removeTask);
  fastify.put('/:taskId', updateTask);

  done();
}

export default router;
