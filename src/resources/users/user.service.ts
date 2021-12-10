import { FastifyRequest, FastifyReply } from 'fastify';

import * as userRepo from './user.repository';
import { HTTP_STATUS, CONTENT_TYPE } from '../../common/constants';
import { User } from './user.model';

const getUsers = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const users = await userRepo.getAll();

    reply
      .code(HTTP_STATUS.OK)
      .header('Content-Type', CONTENT_TYPE.JSON)
      .send(users);
  } catch (e) {
    reply.code(HTTP_STATUS.INTERNAL_ERR).send('Oops!');
  }
};

const getSingleUser = async (
  req: FastifyRequest<{ Params: { userId: string } }>,
  reply: FastifyReply
) => {
  const { userId } = req.params;

  try {
    const user = await userRepo.getById(userId);

    reply
      .code(HTTP_STATUS.OK)
      .header('Content-Type', CONTENT_TYPE.JSON)
      .send(User.toResponse(user));
  } catch (e) {
    reply.code(HTTP_STATUS.INTERNAL_ERR).send('Oops!');
  }
};

const addUser = async (
  req: FastifyRequest<{
    Body: Partial<User>;
  }>,
  reply: FastifyReply
) => {
  const newUser = req.body;
  try {
    const user = await userRepo.create(newUser);

    reply
      .code(HTTP_STATUS.CREATED)
      .header('Content-Type', CONTENT_TYPE.JSON)
      .send(user);
  } catch (e) {
    reply.code(HTTP_STATUS.INTERNAL_ERR).send('Oops!');
  }
};

const removeUser = async (
  req: FastifyRequest<{ Params: { userId: string } }>,
  reply: FastifyReply
) => {
  const { userId } = req.params;

  try {
    const message = await userRepo.remove(userId);

    reply.code(HTTP_STATUS.OK).send({ message });
  } catch (error) {
    reply.code(HTTP_STATUS.INTERNAL_ERR).send('Oops!');
  }
};

const updateUser = async (
  req: FastifyRequest<{ Params: { userId: string }; Body: Partial<User> }>,
  reply: FastifyReply
) => {
  const fields = req.body;
  const { userId } = req.params;

  try {
    const updatedUser = await userRepo.update(userId, fields);

    reply
      .code(HTTP_STATUS.OK)
      .header('Content-Type', CONTENT_TYPE.JSON)
      .send(User.toResponse(updatedUser));
  } catch (error) {
    reply.code(HTTP_STATUS.INTERNAL_ERR).send('Oops!');
  }
};

module.exports = {
  getUsers,
  getSingleUser,
  addUser,
  removeUser,
  updateUser,
};
