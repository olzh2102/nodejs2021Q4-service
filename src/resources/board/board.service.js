const boardRepo = require('./board.repository');
const taskService = require('../task/task.service');

const getAll = () => boardRepo.getAll();
const getById = (id) => boardRepo.getById(id);
const create = (board) => boardRepo.create(board);
const update = (id, fields) => boardRepo.update(id, fields);
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
