const userController = require('./user.controller');

const routes = [
  {
    method: 'GET',
    url: '/users',
    handler: userController.getUsers,
  },
  {
    method: 'POST',
    url: '/users',
    handler: userController.addUser,
  },
  {
    method: 'GET',
    url: '/users/:userId',
    handler: userController.getSingleUser,
  },
  {
    method: 'DELETE',
    url: '/users/:userId',
    handler: userController.removeUser,
  },
  {
    method: 'PUT',
    url: '/users/:userId',
    handler: userController.updateUser,
  },
];

module.exports = routes;
