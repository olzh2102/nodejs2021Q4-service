const boardController = require('./board.controller');

const routes = [
  {
    method: 'GET',
    url: '/boards',
    handler: boardController.getBoards,
  },
  {
    method: 'POST',
    url: '/boards',
    handler: boardController.addBoard,
  },
  //   {
  //     method: 'GET',
  //     url: '/boards/:boardId',
  //     handler: boardController.getSingleBoard,
  //   },
  //   {
  //     method: 'PUT',
  //     url: '/boards/:boardId',
  //     handler: boardController.updateSingleBoard,
  //   },
  //   {
  //     method: 'DELETE',
  //     url: '/boards/:boardId',
  //     handler: boardController.removeBoard,
  //   },
];

module.exports = routes;
