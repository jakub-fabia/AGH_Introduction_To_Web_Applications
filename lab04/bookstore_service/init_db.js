const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.db');

db.run(`
CREATE TABLE IF NOT EXISTS books (
    bookID INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    releaseYear INTEGER NOT NULL
)`);

db.run(`
    CREATE TABLE IF NOT EXISTS users (
     userID INTEGER PRIMARY KEY AUTOINCREMENT,
     email TEXT NOT NULL,
     password TEXT NOT NULL
    )`);

db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      orderID INTEGER PRIMARY KEY AUTOINCREMENT,
      userID INTEGER NOT NULL,
      bookID INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      FOREIGN KEY (userID) REFERENCES users(userID),
      FOREIGN KEY (bookID) REFERENCES books(bookID)
    )`);

module.exports = db;
