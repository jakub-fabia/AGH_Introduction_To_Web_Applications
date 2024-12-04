const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, Book, Order, sequelize} = require('./sequelize');
const app = express();
const port = 5000;
const SECRET_KEY = 'go3yiewrhdgowyiesb3oewyrdfsibko78gyiw'

app.use(bodyParser.json());

// ---------------------------------------------------------------------------------------------------- JWT Tokens
const generateToken = (userId, email) => {
    return jwt.sign({ userId, email }, SECRET_KEY, { expiresIn: '1h' });
};

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(403).send('Access denied');
    }
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }
        req.user = user;
        next();
    });
};


// ---------------------------------------------------------------------------------------------------- Books Endpoints
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.get('/api/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findByPk(id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).send('Book not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.post('/api/books', authenticateJWT, async (req, res) => {
    const { name, author, year } = req.body;
    try {
        const newBook = await Book.create({ name, author, year });
        res.json({ id: newBook.id });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.delete('/api/books/:id', authenticateJWT, async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findByPk(id);
        if (book) {
            await book.destroy();
            res.json({ message: 'Book deleted successfully' });
        } else {
            res.status(404).send('Book not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


// ---------------------------------------------------------------------------------------------------- Orders Endpoints
app.get('/api/orders/:userId', authenticateJWT, async (req, res) => {
    const { userId } = req.params;
    try {
        const userOrders = await User.findOne({
            where: { id: userId },
            include: {
                model: Order,
                include: Book
            }
        });
        if (userOrders) {
            res.json(userOrders);
        } else {
            res.status(404).send('User not found or no orders');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.post('/api/orders', authenticateJWT, async (req, res) => {
    const { userId, bookId, quantity } = req.body;
    try {
        const user = await User.findByPk(userId);
        const book = await Book.findByPk(bookId);
        if (!user || !book) {
            return res.status(404).send('User or Book not found');
        }
        const order = await Order.create({ UserId: userId, BookId: bookId, quantity: quantity });
        res.json({ orderId: order.id });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.delete('/api/orders/:id', authenticateJWT, async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findByPk(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        await order.destroy();
        res.status(200).json({ message: 'Order removed' });
    } catch (error) {
        console.error('Error during order remove:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.patch('/api/orders/:id', authenticateJWT, async (req, res) => {
    try {
        const orderId = req.params.id;
        const { quantity, bookId } = req.body;
        if ((!quantity && !bookId) || quantity <= 0) {
            return res.status(400).json({ message: 'Invalid change' });
        }
        const order = await Order.findByPk(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.quantity = quantity;
        order.BookId = bookId
        await order.save();
        res.status(200).json({ message: 'Order patched', order });
    } catch (error) {
        console.error('Error during order patch:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// ---------------------------------------------------------------------------------------------------- Register and Login Endpoints
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: hashedPassword });
        res.json({ userId: newUser.id });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).send('Cant find user under that email');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }
        const token = generateToken(user.id, email);
        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// ---------------------------------------------------------------------------------------------------- Port

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
