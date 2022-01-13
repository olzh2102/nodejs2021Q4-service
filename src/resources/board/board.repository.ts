import { Board } from './board.model';

let boards: Board[] = [];

/**
 * @returns promise to resolve list of board
 */
export const getAll = (): Promise<Board[]> =>
  new Promise((resolve) => {
    resolve(boards);
  });

/**
 * @param id - uuid type
 * @returns promise to resolve single board by its id
 */
export const getById = (id: string): Promise<Board> =>
  new Promise((resolve, reject) => {
    const board = boards.find((b: Board) => b.id === id);
    if (!board) reject(new Error('Could not find requested board!'));
    else resolve(board);
  });

/**
 * @param board - Object { id, title, columns }
 * @returns promise to resolve newly created board
 */
export const create = (board: Board): Promise<Board> =>
  new Promise((resolve) => {
    const newBoard = new Board(board);
    boards = boards.concat(newBoard);
    resolve(newBoard);
  });

/**
 * @param id - uuid type
 * @param fields - can be any of { title, columns }
 * @returns promise to resolve with updated board
 */
export const update = async (id: string, fields: Board): Promise<Board> =>
  new Promise((resolve) => {
    const board = { ...boards.find((b: Board) => b.id === id), ...fields };
    boards = boards.map((b: Board) => {
      if (b.id === id) return board;
      return b;
    });
    resolve(board);
  });

/**
 * @param id - uuid type
 * @returns promise to resolve a message with successful deleted board
 */
export const remove = async (id: string): Promise<string> =>
  new Promise((resolve) => {
    boards = boards.filter((b: Board) => b.id !== id);
    resolve('Board deleted successfully');
  });
