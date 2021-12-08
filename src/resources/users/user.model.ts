const uuid = require('uuid');

class User {
  id: any;
  login: string;
  password: string;
  name: string;
  constructor({
    id = uuid.v4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: any) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export {};
module.exports = User;
