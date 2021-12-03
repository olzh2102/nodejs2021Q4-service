const userController = require('./user.controller');

function router(fastify, options, done) {
  fastify.get('/users', userController.getUsers);
  fastify.get('/users/:userId', userController.getSingleUser);
  fastify.post('/users', userController.addUser);
  fastify.delete('/users/:userId', userController.removeUser);
  fastify.put('/users/:userId', userController.updateUser);

  done();
}

module.exports = router;
