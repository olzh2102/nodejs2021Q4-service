import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import {
  newBoardSchema,
  updateBoardSchema,
  deleteBoardSchema,
} from './board.schema';
import {
  getBoards,
  getSingleBoard,
  addBoard,
  removeBoard,
  updateBoard,
} from './board.service';

/**
 * creates routes REST endpoint for board resource
 * @param fastify - fastify server instance
 * @param options - fastify options
 * @param done - callback function to call after registering all routes to continue
 */
function router(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
): void {
  fastify.get('/', getBoards);
  fastify.get('/:boardId', getSingleBoard);
  fastify.post('/', newBoardSchema, addBoard);
  fastify.delete('/:boardId', deleteBoardSchema, removeBoard);
  fastify.put('/:boardId', updateBoardSchema, updateBoard);

  done();
}

export default router;
