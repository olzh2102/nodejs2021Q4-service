import { Task } from './task.model';

let tasks: Task[] = [];

export const getAll = (boardId: string) =>
  new Promise((resolve, reject) => {
    if (boardId) resolve(tasks);
    reject(new Error('Could not find board to fetch tasks'));
  });

export const getById = (boardId: string, taskId: string) =>
  new Promise((resolve, reject) => {
    const task = tasks.find(
      (t: Task) => t.id === taskId && t.boardId === boardId
    );

    if (!task)
      reject(new Error(`Could not find requested task with id ${taskId}`));

    resolve(task);
  });

export const create = (boardId: null, task: Task) =>
  new Promise((resolve) => {
    const newTask = new Task({ ...task, boardId });
    tasks = tasks.concat(newTask);
    resolve(newTask);
  });

export const update = async (id: string, fields: Task) =>
  new Promise((resolve) => {
    const task = { ...tasks.find((t: Task) => t.id === id), ...fields };
    tasks = tasks.map((t: Task) => {
      if (t.id === id) return task;
      return t;
    });
    resolve(task);
  });

export const remove = async (boardId: string, taskId: string) =>
  new Promise((resolve, reject) => {
    if (boardId) {
      tasks = tasks.filter((t: Task) => t.id !== taskId);
      resolve('Task deleted successfully');
    }
    reject(new Error('Could not find requested board!'));
  });

export const removeAllBy = async (boardId: string) =>
  new Promise((resolve) => {
    tasks = tasks.filter((t: Task) => t.boardId !== boardId);
    resolve(`All tasks for board id ${boardId} are deleted`);
  });
