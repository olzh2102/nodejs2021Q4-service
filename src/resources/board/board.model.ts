import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Columns as AppColumn } from './column.model';

@Entity('board')
export class Board {
  @PrimaryGeneratedColumn('uuid')
  readonly id?: string;

  @Column()
  title?: string;

  @OneToMany(() => AppColumn, ({ board }) => board, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  columns?: AppColumn[] | undefined;
}
