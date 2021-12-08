import { FastifyRequest, FastifyReply } from 'fastify';

const boardService = require('./board.service');
const Board = require('./board.model');

const getBoards = async (
  req: FastifyRequest,
  reply: FastifyReply
): Promise<any> => {
  try {
    const boards = await boardService.getAll();
    reply.code(200).header('Content-Type', 'application/json').send(boards);
  } catch (e) {
    reply.code(500).send('Oops!');
  }
};

const getSingleBoard = async (
  req: FastifyRequest<any>,
  reply: FastifyReply
): Promise<any> => {
  try {
    const board = await boardService.getById(req.params.boardId);
    reply.code(200).header('Content-Type', 'application/json').send(board);
  } catch (error: any) {
    reply.code(404).send({ Error: error.message });
  }
};

const addBoard = async (
  req: FastifyRequest<any>,
  reply: FastifyReply
): Promise<any> => {
  const board = new Board(req.body);

  try {
    await boardService.create(board);
    reply
      .code(201)
      .header('Content-Type', 'application/json')
      .send(Board.toResponse(board));
  } catch (error) {
    reply.code(500).send('Oops!');
  }
};

const updateBoard = async (
  req: FastifyRequest<any>,
  reply: FastifyReply
): Promise<any> => {
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
    reply.code(500).send('Oops!');
  }
};

const removeBoard = async (
  req: FastifyRequest<any>,
  reply: FastifyReply
): Promise<any> => {
  try {
    const message = await boardService.remove(req.params.boardId);
    reply.code(200).send({ message });
  } catch (error) {
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
