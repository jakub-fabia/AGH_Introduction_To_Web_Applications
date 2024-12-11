// server.js - Main Application Logic
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { sequelize } = require('./sequelize');
const booksRouter = require('./routes/books');
const ordersRouter = require('./routes/orders');
const authRouter = require('./routes/auth');

const app = express();
const port = 5000;
export const SECRET_KEY = 'go3yiewrhdgowyiesb3oewyrdfsibko78gyiw';

app.use(bodyParser.json());

// Middleware for JWT authentication
export const authenticateJWT = (req, res, next) => {
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

// Routes
app.use('/api/books', booksRouter);
app.use('/api/orders', ordersRouter);
app.use('/api', authRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
