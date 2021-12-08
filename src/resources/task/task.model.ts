const uuid = require('uuid');

class Task {
  id: any;
  title: any;
  order: any;
  description: any;
  userId: any;
  columnId: any;
  boardId: any;

  constructor({
    id = uuid.v4(),
    title = 'TASK',
    order = 0,
    description = '',
    // userId = null,
    columnId = null,
    boardId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    // this.userId = userId;
    this.userId = null;
    this.columnId = columnId;
    this.boardId = boardId;
  }

  static toResponse(task: any) {
    const { id, title, order, description, userId } = task;
    return { id, title, order, description, userId };
  }
}

module.exports = Task;
