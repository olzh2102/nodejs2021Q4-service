import { ConnectionOptions } from 'typeorm';
import config from './common/config';

import { User as UserModel } from './resources/users/user.model';
import { Board as BoardModel } from './resources/board/board.model';
import { Task as TaskModel } from './resources/task/task.model';

const ormConfig: ConnectionOptions = {
  type: 'postgres',
  database: config.POSTGRES_DB,
  host: config.POSTGRES_HOSTNAME,
  username: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  port: +config.POSTGRES_PORT,
  synchronize: false,
  logging: true,
  entities: [UserModel, BoardModel, TaskModel],
  migrations: ['./src/migrations/**/*.ts'],
  cli: { migrationsDir: './src/migrations' },
};

export default ormConfig;
