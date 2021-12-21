const boardRepo = require('./board.repository');
const taskRepo = require('../task/task.repository');

const getAll = () => boardRepo.getAll();
const getById = (id) => boardRepo.getById(id);
const create = (board) => boardRepo.create(board);
const update = (id, fields) => boardRepo.update(id, fields);
const remove = async (id) => {
  try {
    await taskRepo.removeAllBy(id);
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
