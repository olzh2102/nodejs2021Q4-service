const boardRepo = require('./board.repository');
const taskService = require('../task/task.service');

const getAll = async () => {
  try {
    return await boardRepo.getAll();
  } catch (error) {
    throw new Error(error.message);
  }
};

const getById = (id) => boardRepo.getById(id);

const create = async (board) => {
  try {
    return await boardRepo.create(board);
  } catch (error) {
    throw new Error(error.message);
  }
};

const update = async (id, fields) => {
  try {
    return await boardRepo.update(id, fields);
  } catch (error) {
    throw new Error(error.message);
  }
};

const remove = async (id) => {
  try {
    await taskService.insert([]);
    return await boardRepo.remove(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
