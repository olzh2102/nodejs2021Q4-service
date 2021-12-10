import { User } from './user.model';

let users: User[] = [];

/**
 * * Asynchronously returns list of user
 * * @return { name, login, id }[]
 */
export const getAll = (): Promise<User[]> =>
  new Promise((resolve) => {
    resolve(users.map(User.toResponse));
  });

/**
 * * Asynchronously returns user by userId
 * * @param id - uuid
 */
export const getById = (id: string): Promise<User> =>
  new Promise((resolve) => {
    const user = users.find((u: User) => u.id === id);
    resolve(User.toResponse(user as User));
  });

export const create = (user: User): Promise<User> =>
  new Promise((resolve) => {
    const newUser = new User(user);
    users = users.concat(newUser);
    resolve(User.toResponse(newUser));
  });

export const remove = async (id: string): Promise<string> =>
  new Promise((resolve) => {
    users = users.filter((u: User) => u.id !== id);
    resolve(`User deleted successfully`);
  });

export const update = async (id: string, fields: User): Promise<User> =>
  new Promise((resolve) => {
    const user = { ...users.find((u: User) => u.id === id), ...fields };
    users = users.map((u: User) => {
      if (u.id === id) return user;
      return u;
    });
    resolve(user);
  });

/**
 * Asynchronously returns updated user
 *
 * @param id - string in uuidv4 format
 * @param updatedUserData - user data with `id`, `name`, `login` and `password` fields
 */
