import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('board')
export class Board {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  title: string;

  @Column('json')
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

  /**
   * @param board - instance of Board class
   * @returns fields of board
   */
  static toResponse(board: Board) {
    return board;
  }
}
