const taskRepo = require('./task.repository');

const getAll = async (boardId) => {
  try {
    return await taskRepo.getAll(boardId);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getById = (boardId, taskId) => taskRepo.getById(boardId, taskId);

const create = async (boardId, task) => {
  try {
    return await taskRepo.create(boardId, task);
  } catch (error) {
    throw new Error(error.message);
  }
};

const update = async (id, fields) => {
  try {
    return await taskRepo.update(id, fields);
  } catch (error) {
    throw new Error(error.message);
  }
};

const remove = async (boardId, taskId) => {
  try {
    return await taskRepo.remove(boardId, taskId);
  } catch (error) {
    throw new Error(error.message);
  }
};

const insert = async (tasks) => taskRepo.insert(tasks);

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  insert,
};
