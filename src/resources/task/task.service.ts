import { FastifyRequest, FastifyReply } from 'fastify';
import { getRepository } from 'typeorm';
import { v4 as uuid } from 'uuid';

// import * as taskRepo from './task.repository';
import { Task } from './task.model';
import { getErrorMessage } from '../../common/utils';

const taskRepo = () => getRepository(Task);

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
    const tasks = await taskRepo().find({
      where: { boardId: req.params.boardId },
    });
    reply.code(200).header('Content-Type', 'application/json').send(tasks);
  } catch (e) {
    reply.code(500).send({ message: getErrorMessage(e) });
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
  const { taskId } = req.params;

  try {
    const task = await taskRepo().findOne(taskId);
    reply.code(200).header('Content-Type', 'application/json').send(task);
  } catch (e) {
    reply.code(404).send({ message: getErrorMessage(e) });
  }
};

/**
 * POST: creates new task
 * @param req - instance of http request
 * @param reply - instance of http replies
 */
export const addTask = async (
  req: FastifyRequest<{ Params: { boardId: string }; Body: Task }>,
  reply: FastifyReply
) => {
  const { boardId } = req.params;
  const newTask = {
    id: uuid(),
    boardId,
    ...req.body,
  };

  try {
    await taskRepo().insert([newTask]);
    reply.code(201).header('Content-Type', 'application/json').send(newTask);
  } catch (e) {
    reply.code(500).send({ message: getErrorMessage(e) });
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
  const { taskId } = req.params;
  const fields = req.body;

  try {
    const updatedTask = await taskRepo().update({ id: taskId }, { ...fields });
    reply
      .code(200)
      .header('Content-Type', 'application/json')
      .send(updatedTask);
  } catch (e) {
    reply.code(500).send({ message: getErrorMessage(e) });
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
  const { taskId } = req.params;

  try {
    await taskRepo().delete(taskId);
    reply.code(204).send();
  } catch (e) {
    reply.code(404).send({ message: getErrorMessage(e) });
  }
};
