import { getRepository } from 'typeorm';
import { User, UserResponse } from './user.model';

const userRepo = () => getRepository(User);

/**
 * @returns promise to resolve list of users
 */
export const getAll = (): Promise<UserResponse[]> => userRepo().find();

/**
 * @param id - uuid type
 * @returns promise to resolve single user by its id
 */
export const getById = async (id: string): Promise<UserResponse> => {
  const user = await userRepo().findOne(id);
  return user as UserResponse;
};

/**
 * @param user - Object { id, name, login, password }
 * @returns promise to resolve newly created user without password fields
 */
export const create = async (user: User): Promise<UserResponse> => {
  let newUser = await userRepo().create(user);
  newUser = await userRepo().save(newUser);
  return newUser;
};

/**
 * @param id - uuid type
 * @returns promise to resolve a message with successful deleted user
 */
export const remove = async (id: string): Promise<string> => {
  const user = await userRepo().findOne(id);

  if (user) userRepo().remove(user);

  return `User deleted successfully`;
};
/**
 * @param id - uuid type
 * @param fields - can be any of { name, login, password }
 * @returns promise to resolve with updated user
 */
export const update = async (
  id: string,
  fields: Partial<User>
): Promise<User | undefined> => {
  let user = await userRepo().findOne(id);

  if (user) {
    user = { ...user, ...fields };
    user = await userRepo().save(user);
  }

  return user;
};
