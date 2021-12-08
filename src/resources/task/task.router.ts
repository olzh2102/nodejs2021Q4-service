const taskController = require('./task.controller');

function router(fastify: any, options: any, done: any) {
  fastify.get('/tasks', taskController.getTasks);
  fastify.post('/tasks', taskController.addTask);
  fastify.get('/tasks/:taskId', taskController.getSingleTask);
  fastify.delete('/tasks/:taskId', taskController.removeTask);
  fastify.put('/tasks/:taskId', taskController.updateTask);

  done();
}

module.exports = router;
