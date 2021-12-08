const taskService = require('./task.service');

const getTasks = async (req: any, reply: any) => {
  try {
    const tasks = await taskService.getAll(req.params.boardId);
    reply.code(200).header('Content-Type', 'application/json').send(tasks);
  } catch (error) {
    reply.code(500).send('Oops!');
  }
};

const getSingleTask = async (req: any, reply: any) => {
  try {
    const task = await taskService.getById(
      req.params.boardId,
      req.params.taskId
    );
    reply.code(200).header('Content-Type', 'application/json').send(task);
  } catch (error: any) {
    reply.code(404).send({ Error: error.message });
  }
};

const addTask = async (req: any, reply: any) => {
  try {
    const task = await taskService.create(req.params.boardId, req.body);
    reply.code(201).header('Content-Type', 'application/json').send(task);
  } catch (error) {
    reply.code(500).send('Oops!');
  }
};

const updateTask = async (req: any, reply: any) => {
  try {
    const updatedTask = await taskService.update(req.params.taskId, req.body);
    reply
      .code(200)
      .header('Content-Type', 'application/json')
      .send(updatedTask);
  } catch (error) {
    reply.code(500).send('Oops!');
  }
};

const removeTask = async (req: any, reply: any) => {
  try {
    const message = await taskService.remove(
      req.params.boardId,
      req.params.taskId
    );
    reply.code(200).send({ message });
  } catch (error: any) {
    reply.code(404).send({ error: error.message });
  }
};

module.exports = {
  getTasks,
  getSingleTask,
  addTask,
  updateTask,
  removeTask,
};
