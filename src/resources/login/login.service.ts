import { Connection } from 'typeorm';
import UserRepo from '../users/user.repository';
import { LoginType } from '../users/user.model';

const userRepo = new UserRepo();
const getToken = (db: Connection, body: LoginType) =>
  userRepo.getToken(db, body);

export default { getToken };
