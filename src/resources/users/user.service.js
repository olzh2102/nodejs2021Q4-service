const userRepo = require('./user.repository');

const getAll = async () => {
  try {
    return await userRepo.getAll();
  } catch (error) {
    throw new Error(error.message);
  }
};

const create = async (user) => {
  try {
    return await userRepo.create(user);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getById = async (id) => {
  try {
    return await userRepo.getById(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

const remove = async (id) => {
  try {
    return await userRepo.remove(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

const update = async (id, fields) => {
  try {
    return await userRepo.update(id, fields);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
