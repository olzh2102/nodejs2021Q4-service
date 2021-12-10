import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import {
  getBoards,
  getSingleBoard,
  addBoard,
  removeBoard,
  updateBoard,
} from './board.service';

function router(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
): void {
  fastify.get('/', getBoards);
  fastify.get('/:boardId', getSingleBoard);
  fastify.post('/', addBoard);
  fastify.delete('/:boardId', removeBoard);
  fastify.put('/:boardId', updateBoard);

  done();
}

export default router;
