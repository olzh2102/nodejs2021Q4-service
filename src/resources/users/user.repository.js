const { readFile, writeFile } = require('fs');
const { join } = require('path');

const User = require('./user.model');

const getAll = () =>
  new Promise((resolve, reject) => {
    readFile(
      join(`${process.cwd()}/src/`, 'user.db.json'),
      'utf-8',
      (err, data) => {
        if (err) reject(err);
        else resolve(JSON.parse(data).users.map(User.toResponse));
      }
    );
  });

const insert = (updatedUsers) =>
  new Promise((resolve, reject) => {
    writeFile(
      join(`${process.cwd()}/src/`, 'user.db.json'),
      JSON.stringify({ users: updatedUsers }),
      'utf-8',
      (err) => {
        if (err) reject(err);
        resolve();
      }
    );
  });

module.exports = {
  getAll,
  insert,
};
