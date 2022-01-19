import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { User } from '../users/user.model';
import { Board } from '../board/board.model';
import { Columns as AppColumn } from '../board/column.model';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  title?: string;

  @Column()
  order?: number;

  @Column()
  description?: string;

  @Column({ nullable: true })
  userId?: string | null;

  @Column({ nullable: true })
  boardId?: string | null;

  @Column({ nullable: true })
  columnId?: string | null;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  user?: User;

  @ManyToOne(() => Board, { onDelete: 'CASCADE' })
  board?: Board;

  @ManyToOne(() => AppColumn, { onDelete: 'SET NULL' })
  column?: AppColumn[];
}
