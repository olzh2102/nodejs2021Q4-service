import { getRepository } from 'typeorm';
import { Board } from './board.model';

// const boards: Board[] = [];
const boardRepo = () => getRepository(Board);

/**
 * @returns promise to resolve list of board
 */
// export const getAll = (): Promise<Board[]> =>
//   new Promise((resolve) => {
//     resolve(boards);
//   });
export const getAll = (): Promise<Board[]> => boardRepo().find();

/**
 * @param id - uuid type
 * @returns promise to resolve single board by its id
 */
// export const getById = (id: string): Promise<Board> =>
//   new Promise((resolve, reject) => {
//     const board = boards.find((b: Board) => b.id === id);
//     if (!board) reject(new Error('Could not find requested board!'));
//     else resolve(board);
//   });
export const getById = async (id: string): Promise<Board | undefined> => {
  const board = await boardRepo().findOne(id);
  return board;
};

/**
 * @param board - Object { id, title, columns }
 * @returns promise to resolve newly created board
 */
// export const create = (board: Board): Promise<Board> =>
//   new Promise((resolve) => {
//     const newBoard = new Board(board);
//     boards = boards.concat(newBoard);
//     resolve(newBoard);
//   });
export const create = async (board: Board): Promise<Board> => {
  let newBoard = boardRepo().create(board);
  newBoard = await boardRepo().save(newBoard);
  return newBoard;
};

/**
 * @param id - uuid type
 * @param fields - can be any of { title, columns }
 * @returns promise to resolve with updated board
 */
// export const update = async (id: string, fields: Board): Promise<Board> =>
//   new Promise((resolve) => {
//     const board = { ...boards.find((b: Board) => b.id === id), ...fields };
//     boards = boards.map((b: Board) => {
//       if (b.id === id) return board;
//       return b;
//     });
//     resolve(board);
//   });
export const update = async (
  id: string,
  fields: Board
): Promise<Board | undefined> => {
  let board = await boardRepo().findOne(id);
  if (board) {
    board = { ...board, ...fields };
    board = await boardRepo().save(board);
  }

  return board;
};

/**
 * @param id - uuid type
 * @returns promise to resolve a message with successful deleted board
 */
// export const remove = async (id: string): Promise<string> =>
//   new Promise((resolve) => {
//     boards = boards.filter((b: Board) => b.id !== id);
//     resolve('Board deleted successfully');
//   });
export const remove = async (id: string): Promise<string> => {
  const board = await boardRepo().findOne(id);
  if (board) boardRepo().remove(board);
  return `Board deleted successfully`;
};
