const taskController = require('./task.controller');

function router(fastify, options, done) {
  fastify.get('/boards/:boardId/tasks', taskController.getTasks);
  fastify.post('/boards/:boardId/tasks', taskController.addTask);
  fastify.get('/boards/:boardId/tasks/:taskId', taskController.getSingleTask);
  fastify.delete('/boards/:boardId/tasks/:taskId', taskController.removeTask);
  fastify.put('/boards/:boardId/tasks/:taskId', taskController.updateTask);

  done();
}

module.exports = router;
