const boardService = require('./board.service');
const Board = require('./board.model');

const getBoards = async (req, reply) => {
  try {
    const boards = await boardService.getAll();
    reply.code(200).header('Content-Type', 'application/json').send(boards);
  } catch (e) {
    console.log(e.message);
    reply.code(500).send('Oops!');
  }
};

const getSingleBoard = async (req, reply) => {
  try {
    const board = await boardService.getById(req.params.boardId);
    reply.code(200).header('Content-Type', 'application/json').send(board);
  } catch (error) {
    console.log(error.message);
    reply.code(500).send('Oops!');
  }
};

const addBoard = async (req, reply) => {
  const board = new Board(req.body);

  try {
    await boardService.create(board);
    reply
      .code(201)
      .header('Content-Type', 'application/json')
      .send(Board.toResponse(board));
  } catch (error) {
    console.log(error.message);
    reply.code(500).send('Oops!');
  }
};

const updateBoard = async (req, reply) => {
  try {
    const updatedBoard = await boardService.update(
      req.params.boardId,
      req.body
    );
    reply
      .code(200)
      .header('Content-Type', 'application/json')
      .send(updatedBoard);
  } catch (error) {
    console.log(error.message);
    reply.code(500).send('Oops!');
  }
};

const removeBoard = async (req, reply) => {
  try {
    await boardService.remove(req.params.boardId);
    reply.code(204);
  } catch (error) {
    console.log(error.message);
    reply.code(500).send('Oops!');
  }
};

module.exports = {
  getBoards,
  getSingleBoard,
  addBoard,
  updateBoard,
  removeBoard,
};
