const boardRepo = require('./board.repository');
const taskRepo = require('../task/task.repository');

const getAll = () => boardRepo.getAll();
const getById = (id: any) => boardRepo.getById(id);
const create = (board: any) => boardRepo.create(board);
const update = (id: any, fields: any) => boardRepo.update(id, fields);
const remove = async (id: any) => {
  try {
    await taskRepo.removeAllBy(id);
    return await boardRepo.remove(id);
  } catch (error: any) {
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
