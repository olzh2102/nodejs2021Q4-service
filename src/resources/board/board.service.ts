import { FastifyRequest, FastifyReply } from 'fastify';
import { getRepository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Board } from './board.model';
import { getErrorMessage } from '../../common/utils';

const boardRepo = () => getRepository(Board);

/**
 * GET: retrieves list of boards
 * @param req - instance of http request
 * @param reply - instance of http replies
 */
export const getBoards = async (
  req: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const boards = await boardRepo().find();
    reply.code(200).header('Content-Type', 'application/json').send(boards);
  } catch (e) {
    reply.code(500).send({ message: getErrorMessage(e) });
  }
};

/**
 * GET: retrieves board by its id
 * @param req - instance of http request
 * @param reply - instance of http replies
 */
export const getSingleBoard = async (
  req: FastifyRequest<{ Params: { boardId: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const { boardId } = req.params;

  try {
    const board = await boardRepo().findOne(boardId);

    if (board)
      reply.code(200).header('Content-Type', 'application/json').send(board);
    else
      reply.code(404).send({ message: `Board with id ${boardId} not found` });
  } catch (e) {
    reply.code(500).send({ message: getErrorMessage(e) });
  }
};

/**
 * POST: creates new board
 * @param req - instance of http request
 * @param reply - instance of http replies
 */
export const addBoard = async (
  req: FastifyRequest<{ Body: Board }>,
  reply: FastifyReply
): Promise<void> => {
  const newBoard = { id: uuid(), ...req.body };
  try {
    await boardRepo().insert([newBoard]);
    reply.code(201).header('Content-Type', 'application/json').send(newBoard);
  } catch (e) {
    reply.code(404).send({ message: getErrorMessage(e) });
  }
};

/**
 * PUT: updates existing board by its id
 * @param req - instance of http request
 * @param reply - instance of http replies
 */
export const updateBoard = async (
  req: FastifyRequest<{ Params: { boardId: string }; Body: Board }>,
  reply: FastifyReply
): Promise<void> => {
  const { boardId } = req.params;

  try {
    const updatedBoard = await boardRepo().update(
      { id: boardId },
      { ...req.body }
    );
    reply
      .code(200)
      .header('Content-Type', 'application/json')
      .send(updatedBoard);
  } catch (e) {
    reply.code(404).send({ message: getErrorMessage(e) });
  }
};

/**
 * DELETE: removes board by its id and its related tasks
 * @param req - instance of http request
 * @param reply - instance of http replies
 */
export const removeBoard = async (
  req: FastifyRequest<{ Params: { boardId: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const { boardId } = req.params;

  try {
    await boardRepo().delete(boardId);

    reply.code(204).send();
  } catch (e) {
    reply.code(404).send({ message: getErrorMessage(e) });
  }
};
