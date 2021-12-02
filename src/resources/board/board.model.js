const uuid = require('uuid');

class Board {
  constructor({
    id = uuid.v4(),
    title = 'BOARD',
    columns = [{ id: uuid.v4(), title: 'COLUMN', order: 0 }],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((c) => ({ ...c, id: uuid.v4() }));
  }

  static toResponse(board) {
    return board;
  }
}

module.exports = Board;
