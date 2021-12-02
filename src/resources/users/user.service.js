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
    const users = await userRepo.getAll();
    return await userRepo.insert(users.concat(user));
  } catch (error) {
    throw new Error(error.message);
  }
};

const getById = async (id) => {
  try {
    const users = await userRepo.getAll();
    return users.find((u) => u.id === id);
  } catch (error) {
    throw new Error(error.message);
  }
};

const remove = async (id) => {
  try {
    const users = await userRepo.getAll();
    return await userRepo.insert(users.filter((u) => u.id !== id));
  } catch (error) {
    throw new Error(error.message);
  }
};

const update = async (id, fields) => {
  try {
    const users = await userRepo.getAll();
    const updatedUser = { ...users.find((u) => u.id === id), ...fields };
    const updatedUsers = users.map((u) => {
      if (u.id === id) return updatedUser;
      return u;
    });
    await userRepo.insert(updatedUsers);
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
