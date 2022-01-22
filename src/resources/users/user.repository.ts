import { Connection } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {
  User,
  UserWithoutPasswordType,
  UserType,
  LoginType,
} from './user.model';

class UserRepository {
  /**
   * GET all users from db
   * @returns list of objects data the user without password field
   */

  async getAll(db: Connection): Promice<UserWithoutPasswordType[]> {
    const;
  }
}
