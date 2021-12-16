import { FastifyRequest, FastifyReply } from 'fastify';

import * as boardRepo from './board.repository';
import * as taskRepo from '../task/task.repository';
import { Board } from './board.model';
import { getErrorMessage } from '../../common/utils';

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
    const boards = await boardRepo.getAll();
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
    const board = await boardRepo.getById(boardId);
    reply.code(200).header('Content-Type', 'application/json').send(board);
  } catch (e) {
    reply.code(404).send({ message: getErrorMessage(e) });
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
  const board = new Board(req.body);

  try {
    await boardRepo.create(board);
    reply
      .code(201)
      .header('Content-Type', 'application/json')
      .send(Board.toResponse(board));
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
    const updatedBoard = await boardRepo.update(boardId, req.body);
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
    const message = await boardRepo.remove(boardId);
    await taskRepo.removeAllBy(boardId);

    reply.code(200).send({ message });
  } catch (e) {
    reply.code(404).send({ message: getErrorMessage(e) });
  }
};
