import { v4 as uuid } from 'uuid';

export class Task {
  readonly id: string;

  title: string;

  order: number;

  description: string;

  userId: null;

  columnId: null;

  boardId: null;

  constructor({
    id = uuid(),
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

  static toResponse(task: Task) {
    const { id, title, order, description, userId } = task;
    return { id, title, order, description, userId };
  }
}
