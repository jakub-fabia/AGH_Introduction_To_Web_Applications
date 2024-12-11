const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./sequelize');
const booksRouter = require('./routes/books');
const ordersRouter = require('./routes/orders');
const authRouter = require('./routes/auth');

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use('/api/books', booksRouter);
app.use('/api/orders', ordersRouter);
app.use('/api', authRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
