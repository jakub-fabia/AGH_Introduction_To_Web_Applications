const express = require('express');
const router = express.Router();
const { Book } = require('../sequelize');
const { authenticateJWT } = require('../tokens');

router.get('/', async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

router.get('/:id', async (req, res) => {
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

router.post('/', authenticateJWT, async (req, res) => {
    const { name, author, year } = req.body;
    try {
        const newBook = await Book.create({ name, author, year });
        res.json({ id: newBook.id });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

router.delete('/:id', authenticateJWT, async (req, res) => {
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

module.exports = router;