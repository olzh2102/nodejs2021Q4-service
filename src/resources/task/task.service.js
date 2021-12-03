const taskRepo = require('./task.repository');

const getAll = (boardId) => taskRepo.getAll(boardId);
const getById = (boardId, taskId) => taskRepo.getById(boardId, taskId);
const create = (boardId, task) => taskRepo.create(boardId, task);
const update = (id, fields) => taskRepo.update(id, fields);
const remove = async (boardId, taskId) => taskRepo.remove(boardId, taskId);
const insert = async (tasks) => taskRepo.insert(tasks);

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  insert,
};
