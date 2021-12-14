import { FastifyRequest, FastifyReply } from 'fastify';

import * as taskRepo from './task.repository';
import { Task } from './task.model';

/**
 * GET: retrieves list of tasks
 * @param req - instance of http request
 * @param reply - instance of http replies
 */
export const getTasks = async (
  req: FastifyRequest<{ Params: { boardId: string } }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const tasks = await taskRepo.getAll(req.params.boardId);
    reply.code(200).header('Content-Type', 'application/json').send(tasks);
  } catch (error) {
    reply.code(500).send('Oops!');
  }
};

/**
 * GET: retrieves task by its id
 * @param req - instance of http request
 * @param reply - instance of http replies
 */
export const getSingleTask = async (
  req: FastifyRequest<{ Params: { boardId: string; taskId: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const { boardId, taskId } = req.params;

  try {
    const task = await taskRepo.getById(boardId, taskId);
    reply.code(200).header('Content-Type', 'application/json').send(task);
  } catch (error) {
    reply.code(404).send({ message: 'Not found!' });
  }
};

/**
 * POST: creates new task
 * @param req - instance of http request
 * @param reply - instance of http replies
 */
export const addTask = async (
  req: FastifyRequest<{ Params: { boardId: null }; Body: Task }>,
  reply: FastifyReply
) => {
  const { boardId } = req.params;
  const newTask = req.body;

  try {
    const task = await taskRepo.create(boardId, newTask);
    reply.code(201).header('Content-Type', 'application/json').send(task);
  } catch (error) {
    reply.code(500).send('Oops!');
  }
};

/**
 * PUT: updates existing task by its id and its boardId
 * @param req - instance of http request
 * @param reply - instance of http replies
 */
export const updateTask = async (
  req: FastifyRequest<{
    Params: { taskId: string; boardId: string };
    Body: Task;
  }>,
  reply: FastifyReply
) => {
  const { taskId, boardId } = req.params;
  const fields = req.body;

  try {
    const updatedTask = await taskRepo.update(boardId, taskId, fields);
    reply
      .code(200)
      .header('Content-Type', 'application/json')
      .send(updatedTask);
  } catch (error) {
    reply.code(500).send('Oops!');
  }
};

/**
 * DELETE: removes task by its id and its boardId
 * @param req - instance of http request
 * @param reply - instance of http replies
 */
export const removeTask = async (
  req: FastifyRequest<{ Params: { boardId: string; taskId: string } }>,
  reply: FastifyReply
) => {
  const { taskId, boardId } = req.params;

  try {
    const message = await taskRepo.remove(boardId, taskId);
    reply.code(200).send({ message });
  } catch (error) {
    reply.code(404).send({ message: 'Not found!' });
  }
};
