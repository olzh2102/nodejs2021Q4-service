import { FastifyRequest, FastifyReply } from 'fastify';

import * as userRepo from './user.repository';
import { User } from './user.model';

type RequestUser = { Params: { userId: string }; Body: User };
type RequestType = FastifyRequest<RequestUser>;

/**
 * * @GET: list of User[]
 * * { id, login, name }
 *
 * * @param req - fastify request
 * * @param reply - fastify server reply
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
 * * @GET: single User by userId
 * * { id, login, name }
 *
 * * @param req - fastify request
 * * @param reply - fastify server reply
 */
export const getSingleUser = async (
  req: RequestType,
  reply: FastifyReply
): Promise<void> => {
  const { userId } = req.params;

  try {
    const user = await userRepo.getById(userId);

    reply
      .code(200)
      .header('Content-Type', 'application/json')
      .send(User.toResponse(user));
  } catch (e) {
    reply.code(500).send('Oops!');
  }
};

/**
 * * @POST: single User
 * * { login, name, password }
 *
 * * @param req - fastify request <Body: User>
 * * @param reply - fastify server reply
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
 * * @DELETE: single User by userId
 * * { login, name, password }
 *
 * * @param req - fastify request <Param: userId>
 * * @param reply - fastify server reply
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
 * * PUT: updating existing User
 * * { login, name }
 *
 * * @param req - http request: { body: User, param: userId }
 * * @param reply - fastify server reply
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
