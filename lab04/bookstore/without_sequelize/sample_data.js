const db = require('./init_db');

db.run(`
INSERT INTO books (title,author,releaseYear)
VALUES ('To Kill a Mockingbird', 'Harper Lee', 1960),
    ('1984', 'George Orwell', 1949),
    ('The Great Gatsby', 'F. Scott Fitzgerald', 1925),
    ('Moby Dick', 'Herman Melville', 1851),
    ('Pride and Prejudice', 'Jane Austen', 1813),
    ('War and Peace', 'Leo Tolstoy', 1869),
    ('The Catcher in the Rye', 'J.D. Salinger', 1951),
    ('Brave New World', 'Aldous Huxley', 1932),
    ('The Lord of the Rings', 'J.R.R. Tolkien', 1954);`)

db.run(`
INSERT INTO users (email,password)
VALUES ('testmail1@mail.pl', 'testPassword1'),
    ('testmail2@mail.pl', 'testPassword2')`)

db.run(`
INSERT INTO orders (userID, bookID, quantity)
VALUES (1, 2, 2),
       (1, 4, 1),
       (1, 7, 5),
       (2, 5, 2),
       (2, 1, 2),
       (2, 8, 5),
       (2, 3, 3)
    `)