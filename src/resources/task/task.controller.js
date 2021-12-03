const taskService = require('./task.service');

const getTasks = async (req, reply) => {
  try {
    const tasks = await taskService.getAll(req.params.boardId);
    reply.code(200).header('Content-Type', 'application/json').send(tasks);
  } catch (error) {
    console.log(error.message);
    reply.code(500).send('Oops!');
  }
};

const getSingleTask = async (req, reply) => {
  try {
    const task = await taskService.getById(
      req.params.boardId,
      req.params.taskId
    );
    reply.code(200).header('Content-Type', 'application/json').send(task);
  } catch (error) {
    console.log(error.message);
    reply.code(404).send({ Error: error.message });
  }
};

const addTask = async (req, reply) => {
  try {
    const task = await taskService.create(req.params.boardId, req.body);
    reply.code(201).header('Content-Type', 'application/json').send(task);
  } catch (error) {
    console.log(error.message);
    reply.code(500).send('Oops!');
  }
};

const updateTask = async (req, reply) => {
  try {
    const updatedTask = await taskService.update(req.params.taskId, req.body);
    reply
      .code(200)
      .header('Content-Type', 'application/json')
      .send(updatedTask);
  } catch (error) {
    console.log(error.message);
    reply.code(500).send('Oops!');
  }
};

const removeTask = async (req, reply) => {
  try {
    const message = await taskService.remove(
      req.params.boardId,
      req.params.taskId
    );
    reply.code(200).send({ message });
  } catch (error) {
    console.log(error.message);
    reply.code(500).send('Oops!');
  }
};

module.exports = {
  getTasks,
  getSingleTask,
  addTask,
  updateTask,
  removeTask,
};
