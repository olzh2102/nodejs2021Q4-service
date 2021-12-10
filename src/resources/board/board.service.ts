import { FastifyRequest, FastifyReply } from 'fastify';

import * as boardRepo from './board.repository';
import * as taskRepo from '../task/task.repository';
import { Board } from './board.model';

export const getBoards = async (
  req: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const boards = await boardRepo.getAll();
    reply.code(200).header('Content-Type', 'application/json').send(boards);
  } catch (e) {
    reply.code(500).send('Oops!');
  }
};

export const getSingleBoard = async (
  req: FastifyRequest<{ Params: { boardId: string } }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const board = await boardRepo.getById(req.params.boardId);
    reply.code(200).header('Content-Type', 'application/json').send(board);
  } catch (error) {
    reply.code(404).send({ message: 'Not found!' });
  }
};

export const addBoard = async (
  req: FastifyRequest<{ Body: Board }>,
  reply: FastifyReply
): Promise<void> => {
  const board = new Board(req.body);

  try {
    await boardRepo.create(board);
    reply
      .code(201)
      .header('Content-Type', 'application/json')
      .send(Board.toResponse(board));
  } catch (error) {
    reply.code(500).send('Oops!');
  }
};

export const updateBoard = async (
  req: FastifyRequest<{ Params: { boardId: string }; Body: Board }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const updatedBoard = await boardRepo.update(req.params.boardId, req.body);
    reply
      .code(200)
      .header('Content-Type', 'application/json')
      .send(updatedBoard);
  } catch (error) {
    reply.code(500).send('Oops!');
  }
};

export const removeBoard = async (
  req: FastifyRequest<{ Params: { boardId: string } }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const message = await boardRepo.remove(req.params.boardId);
    await taskRepo.removeAllBy(req.params.boardId);

    reply.code(200).send({ message });
  } catch (error) {
    reply.code(500).send('Oops!');
  }
};
