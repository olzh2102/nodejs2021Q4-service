const { readFile, writeFile } = require('fs');
const { join } = require('path');

const Board = require('./board.model');

const getAll = () =>
  new Promise((resolve, reject) => {
    readFile(
      join(`${process.cwd()}/src/`, 'board.db.json'),
      'utf-8',
      (err, data) => {
        if (err) reject(err);
        else resolve(JSON.parse(data).boards.map(Board.toResponse));
      }
    );
  });

const insert = (boards) =>
  new Promise((resolve, reject) => {
    writeFile(
      join(`${process.cwd()}/src/`, 'board.db.json'),
      JSON.stringify({ boards }),
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
