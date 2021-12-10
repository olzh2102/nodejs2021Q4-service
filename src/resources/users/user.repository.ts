import * as db from '../../db';

const User = require('./user.model');

let users: any = [];

const getAllUsers = () =>
  new Promise((resolve) => {
    const users = db.getAll('users');
    resolve(users.map(User.toResponse));
  });

const getUserById = (id: string) =>
  new Promise((resolve) => {
    const user = db.findOne('users')(id, 'userId');
    resolve(User.toResponse(user));
  });

export const getAll = (): Promise<User[]> =>
  new Promise((resolve) => {
    resolve(users.map(User.toResponse));
  });

export const getById = (id: string): Promise<User> =>
  new Promise((resolve) => {
    const user = users.find((u: any) => u.id === id);
    resolve(User.toResponse(user));
  });

export const create = (user: Partial<User>): Promise<User> =>
  new Promise((resolve) => {
    const newUser = new User(user);
    users = users.concat(newUser);
    resolve(User.toResponse(newUser));
  });

export const remove = async (id: string): Promise<string> =>
  new Promise((resolve) => {
    users = users.filter((u: any) => u.id !== id);
    resolve(`User deleted successfully`);
  });

export const update = async (id: string, fields: any): Promise<User> =>
  new Promise((resolve) => {
    const user = { ...users.find((u: User) => u.id === id), ...fields };
    users = users.map((u: any) => {
      if (u.id === id) return user;
      return u;
    });
    resolve(user);
  });

type User = {
  id: string;
  login: string;
  name: string;
  password?: string;
};
