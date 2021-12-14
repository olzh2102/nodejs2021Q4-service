import { Task } from './task.model';

let tasks: Task[] = [];

/**
 * @param boardId - uuid type
 * @returns promise to resolve list of tasks by boardId
 */
export const getAll = (boardId: string): Promise<Task[]> =>
  new Promise((resolve, reject) => {
    if (boardId) resolve(tasks);
    reject(new Error('Could not find board to fetch tasks'));
  });

/**
 * @param boardId - uuid type
 * @param taskId - uuid type
 * @returns promise to resolve single task by its id and its boardId
 */
export const getById = (boardId: string, taskId: string): Promise<Task> =>
  new Promise((resolve, reject) => {
    const task = tasks.find(
      (t: Task) => t.id === taskId && t.boardId === boardId
    );

    if (!task)
      reject(new Error(`Could not find requested task with id ${taskId}`));
    else resolve(task);
  });

/**
 * @param boardId - uuid
 * @param task - Object { id, title, columns }
 * @returns promise to resolve newly created task
 */
export const create = (boardId: null, task: Task): Promise<Task> =>
  new Promise((resolve) => {
    const newTask = new Task({ ...task, boardId });
    tasks = tasks.concat(newTask);
    resolve(newTask);
  });

/**
 * @param boardId - uuid type
 * @param id - uuid type
 * @returns promise to resolve with updated task
 */
export const update = async (
  boardId: string,
  id: string,
  fields: Task
): Promise<Task> =>
  new Promise((resolve) => {
    const task = {
      ...tasks.find((t: Task) => t.id === id && t.boardId === boardId),
      ...fields,
    };
    tasks = tasks.map((t: Task) => {
      if (t.id === id) return task;
      return t;
    });
    resolve(task);
  });

/**
 * @param boardId - uuid type
 * @param taskId - uuid type
 * @returns promise to resolve a message with successful deleted task
 */
export const remove = async (
  boardId: string,
  taskId: string
): Promise<string> =>
  new Promise((resolve, reject) => {
    if (boardId) {
      tasks = tasks.filter((t: Task) => t.id !== taskId);
      resolve('Task deleted successfully');
    }
    reject(new Error('Could not find requested task!'));
  });

/**
 * @param boardId - uuid type
 * @returns promise to resolve a message with successful deleted task for given boardId
 */
export const removeAllBy = async (boardId: string): Promise<string> =>
  new Promise((resolve) => {
    tasks = tasks.filter((t: Task) => t.boardId !== boardId);
    resolve(`All tasks for board id ${boardId} are deleted`);
  });
