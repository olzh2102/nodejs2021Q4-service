import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Board } from './board.model';

@Entity('column')
export class Columns {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', { length: 50 })
  title?: string;

  @Column('integer')
  order?: number;

  @Column('varchar')
  boardId?: string;

  @ManyToOne(() => Board, {
    onDelete: 'CASCADE',
  })
  board?: Board;
}
