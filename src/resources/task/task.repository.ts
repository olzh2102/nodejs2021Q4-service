const Task = require('./task.model');

let tasks: any = [];

const getAll = (boardId: any) =>
  new Promise((resolve, reject) => {
    if (boardId) resolve(tasks);
    reject(new Error('Could not find board to fetch tasks'));
  });

const getById = (boardId: any, taskId: any) =>
  new Promise((resolve, reject) => {
    const task = tasks.find(
      (t: any) => t.id === taskId && t.boardId === boardId
    );

    if (!task)
      reject(new Error(`Could not find requested task with id ${taskId}`));

    resolve(task);
  });

const create = (boardId: any, task: any) =>
  new Promise((resolve) => {
    const newTask = new Task({ ...task, boardId });
    tasks = tasks.concat(newTask);
    resolve(newTask);
  });

const update = async (id: any, fields: any) =>
  new Promise((resolve) => {
    const task = { ...tasks.find((t: any) => t.id === id), ...fields };
    tasks = tasks.map((t: any) => {
      if (t.id === id) return task;
      return t;
    });
    resolve(task);
  });

const remove = async (boardId: any, taskId: any) =>
  new Promise((resolve, reject) => {
    if (boardId) {
      tasks = tasks.filter((t: any) => t.id !== taskId);
      resolve('Task deleted successfully');
    }
    reject(new Error('Could not find requested board!'));
  });

const removeAllBy = async (boardId: any) =>
  new Promise((resolve) => {
    tasks = tasks.filter((t: any) => t.boardId !== boardId);
    resolve(`All tasks for board id ${boardId} are deleted`);
  });

export {};
module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  removeAllBy,
};
