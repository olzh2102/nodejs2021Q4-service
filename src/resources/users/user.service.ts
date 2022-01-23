import { FastifyRequest, FastifyReply } from 'fastify';
import { getRepository } from 'typeorm';

// import * as userRepo from './user.repository';
import { User, UserResponse } from './user.model';
import { getErrorMessage } from '../../common/utils';
// import log from '../../logger/logger';

const userRepo = () => getRepository(User);

type RequestUser = { Params: { userId: string }; Body: User };
type RequestType = FastifyRequest<RequestUser>;

/**
 * GET: retrieves list of users
 * @param req - instance of http request
 * @param reply - instance of http replies
 */
export const getUsers = async (
  req: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const users = await userRepo().find();

    reply.code(200).header('Content-Type', 'application/json').send(users);
  } catch (e) {
    reply.code(500).send({ message: getErrorMessage(e) });
  }
};

/**
 * GET: retrieves user by its id
 * @param req - instance of http request
 * @param reply - instance of http replies
 */
export const getSingleUser = async (
  req: RequestType,
  reply: FastifyReply
): Promise<void> => {
  const { userId } = req.params;

  try {
    const user: UserResponse | undefined = await userRepo().findOne(userId);

    if (user)
      reply.code(200).header('Content-Type', 'application/json').send(user);
    else
      reply
        .code(404)
        .send({ message: `Could not find user with id ${userId}` });
  } catch (e) {
    reply.code(500).send({ message: getErrorMessage(e) });
  }
};

/**
 * POST: creates new user
 * @param req - instance of http request
 * @param reply - instance of http replies
 */
export const addUser = async (
  req: RequestType,
  reply: FastifyReply
): Promise<void> => {
  let newUser = new User(req.body);

  try {
    await userRepo().insert(newUser);
    newUser = (await userRepo().findOne(newUser.id)) as User;

    if (newUser)
      reply.code(201).header('Content-Type', 'application/json').send(newUser);
  } catch (e) {
    reply.code(500).send({ message: getErrorMessage(e) });
  }
};

/**
 * DELETE: removes user by its id
 * @param req - instance of http request
 * @param reply - instance of http replies
 */
export const removeUser = async (
  req: RequestType,
  reply: FastifyReply
): Promise<void> => {
  const { userId } = req.params;

  try {
    await userRepo().delete(userId);

    reply.status(204).send();
  } catch (e) {
    reply.code(500).send({ message: getErrorMessage(e) });
  }
};

/**
 * PUT: updates existing user by its id
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
    await userRepo().update(
      { id: userId },
      {
        ...fields,
      }
    );

    reply.status(200).send({ ...fields, id: userId });
  } catch (e) {
    reply.code(500).send({ message: getErrorMessage(e) });
  }
};
