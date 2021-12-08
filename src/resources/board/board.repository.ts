const Board = require('./board.model');

let boards: any = [];

const getAll = () =>
  new Promise((resolve) => {
    resolve(boards);
  });

const getById = (id: any) =>
  new Promise((resolve, reject) => {
    const board = boards.find((b: any) => b.id === id);
    if (!board) reject(new Error('Could not find requested board!'));
    resolve(board);
  });

const create = (board: any) =>
  new Promise((resolve) => {
    const newBoard = new Board(board);
    boards = boards.concat(newBoard);
    resolve(newBoard);
  });

const update = async (id: any, fields: any) =>
  new Promise((resolve) => {
    const board = { ...boards.find((b: any) => b.id === id), ...fields };
    boards = boards.map((b: any) => {
      if (b.id === id) return board;
      return b;
    });
    resolve(board);
  });

const remove = async (id: any) =>
  new Promise((resolve) => {
    boards = boards.filter((b: any) => b.id !== id);
    resolve('Board deleted successfully');
  });

export {};
module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
