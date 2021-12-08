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
) {
  fastify.get('/', getBoards);
  fastify.get('/:boardId', getSingleBoard);
  fastify.post('/', addBoard);
  fastify.delete('/:boardId', removeBoard);
  fastify.put('/:boardId', updateBoard);

  done();
}

export {};
module.exports = router;
