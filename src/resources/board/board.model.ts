import { v4 as uuid } from 'uuid';

export class Board {
  title: string;

  id: string;

  columns: { id: string; title: string; order: number }[];

  constructor({
    id = uuid(),
    title = 'BOARD',
    columns = [{ id: uuid(), title: 'COLUMN', order: 0 }],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((c) => ({ ...c, id: uuid() }));
  }

  static toResponse(board: Board) {
    return board;
  }
}
