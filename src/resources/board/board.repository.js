const Board = require('./board.model');

let boards = [];

const getAll = () =>
  new Promise((resolve) => {
    resolve(boards);
  });

const getById = (id) =>
  new Promise((resolve, reject) => {
    const board = boards.find((b) => b.id === id);
    if (!board) reject(new Error('Could not find requested board!'));
    resolve(board);
  });

const create = (board) =>
  new Promise((resolve) => {
    const newBoard = new Board(board);
    boards = boards.concat(newBoard);
    resolve(newBoard);
  });

const update = async (id, fields) =>
  new Promise((resolve) => {
    const board = { ...boards.find((b) => b.id === id), ...fields };
    boards = boards.map((b) => {
      if (b.id === id) return board;
      return b;
    });
    resolve(board);
  });

const remove = async (id) =>
  new Promise((resolve) => {
    boards = boards.filter((b) => b.id !== id);
    resolve('Board deleted successfully');
  });

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
