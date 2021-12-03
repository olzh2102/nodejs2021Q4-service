const User = require('./user.model');

let users = [];

const getAll = () =>
  new Promise((resolve) => {
    resolve(users.map(User.toResponse));
  });

const getById = (id) =>
  new Promise((resolve) => {
    const user = users.find((u) => u.id === id);
    resolve(User.toResponse(user));
  });

const create = (user) =>
  new Promise((resolve) => {
    const newUser = new User(user);
    users = users.concat(newUser);
    resolve(User.toResponse(newUser));
  });

const remove = async (id) =>
  new Promise((resolve) => {
    users = users.filter((u) => u.id !== id);
    resolve(`User deleted successfully`);
  });

const update = async (id, fields) =>
  new Promise((resolve) => {
    const user = { ...users.find((u) => u.id === id), ...fields };
    users = users.map((u) => {
      if (u.id === id) return user;
      return u;
    });
    resolve(user);
  });

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
