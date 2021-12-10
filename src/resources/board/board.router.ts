import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify';

const {
  getBoards,
  getSingleBoard,
  addBoard,
  removeBoard,
  updateBoard,
} = require('./board.controller');

function router(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: (err?: FastifyError) => void
): void {
  fastify.get('/', getBoards);
  fastify.get('/:boardId', getSingleBoard);
  fastify.post('/', addBoard);
  fastify.delete('/:boardId', removeBoard);
  fastify.put('/:boardId', updateBoard);

  done();
}

module.exports = router;
