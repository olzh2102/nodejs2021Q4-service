const boardController = require('./board.controller');

function router(fastify, options, done) {
  fastify.get('/boards', boardController.getBoards);
  fastify.get('/boards/:boardId', boardController.getSingleBoard);
  fastify.post('/boards', boardController.addBoard);
  fastify.delete('/boards/:boardId', boardController.removeBoard);
  fastify.put('/boards/:boardId', boardController.updateBoard);
  done();
}

module.exports = router;
