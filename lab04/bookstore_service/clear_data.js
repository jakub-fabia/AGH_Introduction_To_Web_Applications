const db = require('./init_db');

db.run(`DROP TABLE books`)
db.run(`DROP TABLE users`)
db.run(`DROP TABLE orders`)