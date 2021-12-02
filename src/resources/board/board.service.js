const boardRepo = require('./board.repository');

const getAll = async () => {
  try {
    return await boardRepo.getAll();
  } catch (error) {
    throw new Error(error.message);
  }
};

const getById = async (id) => {
  try {
    const boards = await boardRepo.getAll();
    return boards.find((b) => b.id === id);
  } catch (error) {
    throw new Error(error.message);
  }
};

const create = async (board) => {
  try {
    const boards = await boardRepo.getAll();
    return await boardRepo.insert(boards.concat(board));
  } catch (error) {
    throw new Error(error.message);
  }
};

const update = async (id, fields) => {
  try {
    const boards = await boardRepo.getAll();
    const updatedBoard = { ...boards.find((b) => b.id === id), ...fields };
    const updatedBoards = boards.map((b) => {
      if (b.id === id) return updatedBoard;
      return b;
    });
    await boardRepo.insert(updatedBoards);
    return updatedBoard;
  } catch (error) {
    throw new Error(error.message);
  }
};

const remove = async (id) => {
  try {
    const boards = await boardRepo.getAll();
    return await boardRepo.insert(boards.filter((b) => b.id !== id));
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
