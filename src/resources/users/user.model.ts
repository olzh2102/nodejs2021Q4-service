import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Task } from '../task/task.model';

export type LoginType = {
  login: string;
  password: string;
};

export type UserType = {
  id: string;
  name: string;
  login: string;
  password: string;
};

export type UserWithoutPasswordType = {
  id: string;
  name: string;
  login: string;
};
@Entity('user')
export class User implements UserType {
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Column()
  login!: string;

  @Column({ select: false })
  password!: string;

  @Column()
  name!: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks!: string;
}
