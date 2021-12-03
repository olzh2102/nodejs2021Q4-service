const Task = require('./task.model');

let tasks = [];

const getAll = (boardId) =>
  new Promise((resolve, reject) => {
    if (boardId) resolve(tasks);
    reject(new Error('Could not find board to fetch tasks'));
  });

const getById = (boardId, taskId) =>
  new Promise((resolve, reject) => {
    const task = boardId && tasks.find((t) => t.id === taskId);
    if (!task) reject(new Error('Could not find requested board!'));
    resolve(task);
  });

const create = (boardId, task) =>
  new Promise((resolve) => {
    const newTask = new Task({ ...task, boardId });
    tasks = tasks.concat(newTask);
    resolve(newTask);
  });

const update = async (id, fields) =>
  new Promise((resolve) => {
    const task = { ...tasks.find((t) => t.id === id), ...fields };
    tasks = tasks.map((t) => {
      if (t.id === id) return task;
      return t;
    });
    resolve(task);
  });

const remove = async (boardId, taskId) =>
  new Promise((resolve, reject) => {
    if (boardId) {
      tasks = tasks.filter((t) => t.id !== taskId);
      resolve('Task deleted successfully');
    }
    reject(new Error('Could not find requested board!'));
  });

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
