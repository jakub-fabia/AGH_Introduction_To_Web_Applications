const db = require("./init_db");

function getOrdersOfUser(id) {
    return new Promise((resolve, reject) => {
        db.all('SELECT orderID, title, author, releaseYear, quantity FROM orders INNER JOIN books ON orders.bookID = books.bookID WHERE userID = ?', [id], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                if (rows.length > 0) {
                    resolve(rows);  // Return the list of orders
                } else {
                    resolve({ message: 'No orders found for this user.' });  // No orders found
                }
            }
        });
    });
}

function placeOrder(userID, bookID, quantity) {
    return new Promise((resolve, reject) => {
        db.get('SELECT bookID FROM books WHERE bookID = ?', [bookID], (err, row) => {
            if (err) {
                reject(new Error('Error checking book existence: ' + err.message));
            } else if (!row) {
                resolve({ success: false, message: 'No book found with the given ID' });
            } else {
                db.run('INSERT INTO orders (userID, bookID, quantity) VALUES (?,?,?)', [userID, bookID, quantity], function (err) {
                    if (err) {
                        reject(new Error('Error placing order: ' + err.message));
                    }
                    resolve({ success: true, message: 'Order placed successfully', orderID: this.lastID });
                });
            }
        });
    });
}

function deleteOrder(userID, orderID) {
    return new Promise((resolve, reject) => {
        db.get('SELECT orderID FROM orders WHERE orderID = ? AND userID = ?', [orderID, userID], (err, row) => {
            if (err) {
                reject(new Error('Error checking order existence: ' + err.message));
            } else if (!row) {
                resolve({ success: false, message: 'No order found with the given ID or order not assigned to your account.' });
            } else {
                db.run('DELETE FROM orders WHERE orderID = ?', [orderID], (err) => {
                    if (err) {
                        reject(new Error('Error deleting order: ' + err.message));
                    } else {
                        resolve({ message: 'Order successfully deleted' });
                    }
                });
            }
        });
    });
}

function editOrder(userID, orderID, bookID, quantity) {
    return new Promise((resolve, reject) => {
        db.get('SELECT orderID FROM orders WHERE orderID = ? AND userID = ?', [orderID, userID], (err, row) => {
            if (err) {
                reject(new Error('Error checking order existence: ' + err.message));
            } else if (!row) {
                resolve({ success: false, message: 'No order found with the given ID or order not assigned to your account.' });
            } else {
                // Combine the updates into a single query
                db.run('UPDATE orders SET bookID = ?, quantity = ? WHERE orderID = ? AND userID = ?',
                    [bookID, quantity, orderID, userID], (err) => {
                        if (err) {
                            reject(new Error('Error editing order: ' + err.message));
                        } else {
                            resolve({ message: 'Order successfully edited' });
                        }
                    });
            }
        });
    });
}


module.exports = {
    getOrdersOfUser,
    placeOrder,
    deleteOrder,
    editOrder
};
