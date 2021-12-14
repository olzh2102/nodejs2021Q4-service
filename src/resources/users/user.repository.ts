import { User, UserResponse } from './user.model';

let users: User[] = [];

/**
 * @returns promise to resolve list of users
 */
export const getAll = (): Promise<UserResponse[]> =>
  new Promise((resolve) => {
    resolve(users.map(User.toResponse));
  });

/**
 * @param id - uuid type
 * @returns promise to resolve single user by its id
 */
export const getById = (id: string): Promise<UserResponse> =>
  new Promise((resolve) => {
    const user = users.find((u: User) => u.id === id);
    resolve(User.toResponse(user as User));
  });

/**
 * @param user - Object { id, name, login, password }
 * @returns promise to resolve newly created user without password fields
 */
export const create = (user: User): Promise<UserResponse> =>
  new Promise((resolve) => {
    const newUser = new User(user);
    users = users.concat(newUser);
    resolve(User.toResponse(newUser));
  });

/**
 *
 * @param id - uuid type
 * @returns promise to resolve a message with successful deleted user
 */
export const remove = async (id: string): Promise<string> =>
  new Promise((resolve) => {
    users = users.filter((u: User) => u.id !== id);
    resolve(`User deleted successfully`);
  });

/**
 *
 * @param id - uuid type
 * @param fields - can be any of { name, login, password }
 * @returns promise to resolve with updated user
 */
export const update = async (id: string, fields: User): Promise<User> =>
  new Promise((resolve) => {
    const user = { ...users.find((u: User) => u.id === id), ...fields };
    users = users.map((u: User) => {
      if (u.id === id) return user;
      return u;
    });
    resolve(user);
  });
