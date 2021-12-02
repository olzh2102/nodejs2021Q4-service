const usersRepo = require('./user.repository');

const getAll = async () => {
  try {
    return await usersRepo.getAll();
  } catch (error) {
    throw new Error(error.message);
  }
};

const create = async (user) => {
  try {
    const users = await usersRepo.getAll();
    return await usersRepo.insert(users.concat(user));
  } catch (error) {
    throw new Error(error.message);
  }
};

const getById = async (id) => {
  try {
    const users = await usersRepo.getAll();
    return users.find((u) => u.id === id);
  } catch (error) {
    throw new Error(error.message);
  }
};

const remove = async (id) => {
  try {
    const users = await usersRepo.getAll();
    return await usersRepo.insert(users.filter((u) => u.id !== id));
  } catch (error) {
    throw new Error(error.message);
  }
};

const update = async (id, fields) => {
  try {
    const users = await usersRepo.getAll();
    const updatedUser = { ...users.find((u) => u.id === id), ...fields };
    const updatedUsers = users.map((u) => {
      if (u.id === id) return updatedUser;
      return u;
    });
    await usersRepo.insert(updatedUsers);
    return updatedUser;
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
