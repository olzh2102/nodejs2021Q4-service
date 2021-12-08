const userRepo = require('./user.repository');

const getAll = () => userRepo.getAll();
const create = (user: any) => userRepo.create(user);
const getById = (id: any) => userRepo.getById(id);
const remove = (id: any) => userRepo.remove(id);
const update = (id: any, fields: any) => userRepo.update(id, fields);

export {};
module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
