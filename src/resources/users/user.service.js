const userRepo = require('./user.repository');

const getAll = () => userRepo.getAll();
const create = (user) => userRepo.create(user);
const getById = (id) => userRepo.getById(id);
const remove = (id) => userRepo.remove(id);
const update = (id, fields) => userRepo.update(id, fields);

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
