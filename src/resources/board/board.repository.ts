import { Board } from './board.model';

let boards: Board[] = [];

export const getAll = () =>
  new Promise((resolve) => {
    resolve(boards);
  });

export const getById = (id: string) =>
  new Promise((resolve, reject) => {
    const board = boards.find((b: Board) => b.id === id);
    if (!board) reject(new Error('Could not find requested board!'));
    resolve(board);
  });

export const create = (board: Board) =>
  new Promise((resolve) => {
    const newBoard = new Board(board);
    boards = boards.concat(newBoard);
    resolve(newBoard);
  });

export const update = async (id: string, fields: Board) =>
  new Promise((resolve) => {
    const board = { ...boards.find((b: Board) => b.id === id), ...fields };
    boards = boards.map((b: Board) => {
      if (b.id === id) return board;
      return b;
    });
    resolve(board);
  });

export const remove = async (id: string) =>
  new Promise((resolve) => {
    boards = boards.filter((b: Board) => b.id !== id);
    resolve('Board deleted successfully');
  });
