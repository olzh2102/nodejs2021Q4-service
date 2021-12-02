const boardService = require('./board.service');
const Board = require('./board.model');

const getBoards = async (req, reply) => {
  try {
    reply.send({ hello: 'world' });
  } catch (e) {
    console.log(e.message);
    reply.code(500).send('Oops!');
  }
};

const addBoard = async (req, reply) => {
  const board = new Board(req.body);

  try {
    await boardService.create(board);
    reply.code(201).send(Board.toResponse(board));
  } catch (error) {
    console.log(error.message);
    reply.code(500).send('Oops!');
  }
};

module.exports = {
  getBoards,
  addBoard,
};
