const db = require('./init_db');

function getBooks() {
    return new Promise((resolve, reject) => {
        db.all('SELECT bookID, title, author, releaseYear FROM books', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function getBookById(id) {
    return new Promise((resolve, reject) => {
        db.get('SELECT title, author, releaseYear FROM books WHERE bookID = ?', [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                if (row) {
                    resolve(row);
                } else {
                    resolve({ message: 'Book not found' });
                }
            }
        });
    });
}

function addBook(title, author, releaseYear) {
    return new Promise((resolve, reject) => {
        if (isNaN(releaseYear)) {
            return reject(new Error('Invalid release year.'));
        }
        db.run('INSERT INTO books (title, author, releaseYear) VALUES (?, ?, ?)', [title, author, releaseYear], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
}

function deleteBook(id) {
    return new Promise((resolve, reject) => {
        db.get('SELECT bookID FROM books WHERE bookID = ?', [id], (err, row) => {
            if (err) {
                reject(new Error('Error checking book existence: ' + err.message));
            } else if (!row) {
                resolve({ success: false, message: 'No book found with the given ID' });
            } else {
                db.run('DELETE FROM books WHERE bookID = ?', [id], (err) => {
                    if (err) {
                        reject(new Error('Error deleting book: ' + err.message));
                    } else {
                        resolve({ message: 'Book successfully deleted' });
                    }
                });
            }
        });
    });
}

module.exports = {
    getBooks,
    getBookById,
    addBook,
    deleteBook
};
