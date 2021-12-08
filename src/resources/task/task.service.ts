const taskRepo = require('./task.repository');

const getAll = (boardId: any) => taskRepo.getAll(boardId);
const getById = (boardId: any, taskId: any) =>
  taskRepo.getById(boardId, taskId);
const create = (boardId: any, task: any) => taskRepo.create(boardId, task);
const update = (id: any, fields: any) => taskRepo.update(id, fields);
const remove = async (boardId: any, taskId: any) =>
  taskRepo.remove(boardId, taskId);
const insert = async (tasks: any) => taskRepo.insert(tasks);

export {};
module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  insert,
};
