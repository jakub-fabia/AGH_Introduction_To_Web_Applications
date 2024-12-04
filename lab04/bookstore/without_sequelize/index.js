var express = require('express');
var bodyParser = require("body-parser");
const books = require('./books');
const users = require('./users');
const orders = require('./orders');
const {use} = require("express/lib/router");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/books/", async function(req, res) {
    try {
        const allBooks = await books.getBooks();
        res.send(allBooks);
    } catch (err) {
        res.status(500).send({"message": "Error retrieving books", "error": err.message});
    }
});

app.get("/api/books/:id", async function(req, res) {
    try {
        const book = await books.getBookById(req.params.id);
        if (book) {
            res.send(book);
        } else {
            res.status(404).send({"message": "Book not found"});
        }
    } catch (err) {
        res.status(500).send({"message": "Error retrieving book", "error": err.message});
    }
});

app.post("/api/books", users.verifyToken, async function(req, res) {
    const bookTitle = req.body.bookTitle;
    const bookAuthor = req.body.bookAuthor;
    const releaseYear = req.body.releaseYear;
    try {
        const newBookID = await books.addBook(bookTitle, bookAuthor, releaseYear);
        res.send({"message": "Success", "bookID": newBookID});
    } catch (err) {
        res.status(500).send({"message": "Failed to add book", "error": err.message});
    }
});

app.delete("/api/books/:id", users.verifyToken, async function(req, res) {
    try {
        const result = await books.deleteBook(req.params.id);
        if (result.success) {
            res.send({ message: result.message });
        } else {
            res.status(404).send({ message: result.message });
        }
    } catch (err) {
        res.status(500).send({ message: 'Failed to delete book', error: err.message });
    }
});


app.post("/api/register", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const newUserID = await users.registerUser(email, password);
        res.send({"message": "Registered successfully", "userID": newUserID});
    } catch (err) {
        res.status(500).send({"message": "Failed to register", "error": err.message});
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const loginResponse = await users.loginUser(email, password);

        if (loginResponse.success) {
            res.send({
                message: loginResponse.message,
                token: loginResponse.token
            });
        } else {
            res.status(401).send({ message: loginResponse.message });
        }
    } catch (err) {
        res.status(500).send({ message: 'Error logging in', error: err.message });
    }
});

app.get("/api/orders/:id", async function(req, res) {
    try {
        const result = await orders.getOrdersOfUser(req.params.id);

        if (Array.isArray(result)) {
            res.send(result);
        } else {
            res.status(404).send({ message: result.message });
        }
    } catch (err) {
        res.status(500).send({ message: 'Error fetching orders', error: err.message });
    }
});

app.post("/api/orders", users.verifyToken, async function(req, res) {
    const { bookID, quantity } = req.body;
    const userID = req.user.userID;

    try {
        const result = await orders.placeOrder(userID, bookID, quantity);

        if (result.success) {
            res.status(201).send({ message: result.message, orderID: result.orderID });
        } else {
            res.status(400).send({ message: result.message });
        }
    } catch (err) {
        res.status(500).send({ message: 'Error placing order', error: err.message });
    }
});

app.delete("/api/orders/:id", users.verifyToken, async function(req, res) {
    const orderID = req.params.id;
    const userID = req.user.userID
    try {
        const result = await orders.deleteOrder(userID, orderID);
        if (result.success) {
            res.send({ message: result.message });
        } else {
            res.status(404).send({ message: result.message });
        }
    } catch (err) {
        res.status(500).send({ message: 'Failed to delete order', error: err.message });
    }
})

app.patch("/api/orders/:id", users.verifyToken, async function(req, res) {
    const orderID = req.params.id;
    const userID = req.user.userID;
    const bookID = req.body.bookID;
    const quantity = req.body.quantity;

    try {
        const result = await orders.editOrder(userID, orderID, bookID, quantity);
        if (result.success) {
            res.send({ message: result.message });
        } else {
            res.status(404).send({ message: result.message });
        }
    } catch (err) {
        res.status(500).send({ message: 'Failed to edit order', error: err.message });
    }
})

app.listen(process.env.PORT || 3000, function() {
    console.log("Server Started!");
});