import { FastifyRequest, FastifyReply } from 'fastify';

import * as userRepo from './user.repository';
import { User, UserResponse } from './user.model';

type RequestUser = { Params: { userId: string }; Body: User };
type RequestType = FastifyRequest<RequestUser>;

/**
 * GET: retrieves list of users
 *
 * @param req - instance of http request
 * @param reply - instance of http replies
 */
export const getUsers = async (
  req: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const users = await userRepo.getAll();

    reply.code(200).header('Content-Type', 'application/json').send(users);
  } catch (e) {
    reply.code(500).send('Oops!');
  }
};

/**
 * GET: retrieves user by its id
 *
 * @param req - instance of http request
 * @param reply - instance of http replies
 */
export const getSingleUser = async (
  req: RequestType,
  reply: FastifyReply
): Promise<void> => {
  const { userId } = req.params;

  try {
    const user: UserResponse = await userRepo.getById(userId);

    reply
      .code(200)
      .header('Content-Type', 'application/json')
      .send(User.toResponse(user as User));
  } catch (e) {
    reply.code(500).send('Oops!');
  }
};

/**
 * POST: creates new user
 *
 * @param req - instance of http request
 * @param reply - instance of http replies
 */
export const addUser = async (
  req: RequestType,
  reply: FastifyReply
): Promise<void> => {
  const newUser = req.body;

  try {
    const user = await userRepo.create(newUser);

    reply.code(201).header('Content-Type', 'application/json').send(user);
  } catch (e) {
    reply.code(500).send('Oops!');
  }
};

/**
 * DELETE: removes user by its id
 *
 * @param req - instance of http request
 * @param reply - instance of http replies
 */
export const removeUser = async (
  req: RequestType,
  reply: FastifyReply
): Promise<void> => {
  const { userId } = req.params;

  try {
    const message = await userRepo.remove(userId);

    reply.code(200).send({ message });
  } catch (error) {
    reply.code(500).send('Oops!');
  }
};

/**
 * PUT: updates existing user by its id
 *
 * @param req - instance of http request
 * @param reply - instance of http replies
 */
export const updateUser = async (
  req: RequestType,
  reply: FastifyReply
): Promise<void> => {
  const fields = req.body;
  const { userId } = req.params;

  try {
    const updatedUser = await userRepo.update(userId, fields);

    reply
      .code(200)
      .header('Content-Type', 'application/json')
      .send(User.toResponse(updatedUser));
  } catch (error) {
    reply.code(500).send('Oops!');
  }
};
