const userService = require('./user.service');
const User = require('./user.model');

const getUsers = async (req: any, reply: any) => {
  try {
    const users = await userService.getAll();
    reply.code(200).header('Content-Type', 'application/json').send(users);
  } catch (e) {
    reply.code(500).send('Oops!');
  }
};

const getSingleUser = async (req: any, reply: any) => {
  try {
    const user = await userService.getById(req.params.userId);
    reply
      .code(200)
      .header('Content-Type', 'application/json')
      .send(User.toResponse(user));
  } catch (error) {
    reply.code(500).send('Oops!');
  }
};

const addUser = async (req: any, reply: any) => {
  try {
    const newUser = await userService.create(req.body);
    reply.code(201).header('Content-Type', 'application/json').send(newUser);
  } catch (e) {
    reply
      .code(500)
      .send({ message: 'Could not create user. Something went wrong' });
  }
};

const removeUser = async (req: any, reply: any) => {
  try {
    const message = await userService.remove(req.params.userId);
    reply.code(200).send({ message });
  } catch (error) {
    reply.code(500).send('Oops!');
  }
};

const updateUser = async (req: any, reply: any) => {
  try {
    const updatedUser = await userService.update(req.params.userId, req.body);
    reply
      .code(200)
      .header('Content-Type', 'application/json')
      .send(User.toResponse(updatedUser));
  } catch (error) {
    reply.code(500).send('Oops!');
  }
};

module.exports = {
  getUsers,
  getSingleUser,
  addUser,
  removeUser,
  updateUser,
};
