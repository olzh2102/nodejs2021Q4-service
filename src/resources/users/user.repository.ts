const User = require('./user.model');

let users: any = [];

const getAll = () =>
  new Promise((resolve) => {
    resolve(users.map(User.toResponse));
  });

const getById = (id: any) =>
  new Promise((resolve) => {
    const user = users.find((u: any) => u.id === id);
    resolve(User.toResponse(user));
  });

const create = (user: any) =>
  new Promise((resolve) => {
    const newUser = new User(user);
    users = users.concat(newUser);
    resolve(User.toResponse(newUser));
  });

const remove = async (id: any) =>
  new Promise((resolve) => {
    users = users.filter((u: any) => u.id !== id);
    resolve(`User deleted successfully`);
  });

const update = async (id: any, fields: any) =>
  new Promise((resolve) => {
    const user = { ...users.find((u: any) => u.id === id), ...fields };
    users = users.map((u: any) => {
      if (u.id === id) return user;
      return u;
    });
    resolve(user);
  });

export {};
module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
