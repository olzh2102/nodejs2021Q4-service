import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

export type UserResponse = {
  id: string;
  name: string;
  login: string;
};

export type UserType = UserResponse & { password: string };

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

  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }
}
