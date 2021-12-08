const uuid = require('uuid');

class Board {
  title: string;
  id: any;
  columns: { id: any; title: string; order: number }[];

  constructor({
    id = uuid.v4(),
    title = 'BOARD',
    columns = [{ id: uuid.v4(), title: 'COLUMN', order: 0 }],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((c) => ({ ...c, id: uuid.v4() }));
  }

  static toResponse(board: any) {
    return board;
  }
}

export {};
module.exports = Board;
