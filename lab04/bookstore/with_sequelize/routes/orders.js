const express = require('express');
const router = express.Router();
const { User, Book, Order } = require('../sequelize');
const { authenticateJWT } = require('../tokens');

router.get('/:userId', authenticateJWT, async (req, res) => {
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

router.post('/', authenticateJWT, async (req, res) => {
    const { userId, bookId, quantity } = req.body;
    try {
        const user = await User.findByPk(userId);
        const book = await Book.findByPk(bookId);
        console.log(user, book);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        if (!user) {
            return res.status(404).send('User not found');
        }
        const order = await Order.create({ UserId: userId, BookId: bookId, quantity: quantity });
        res.json({ orderId: order.id });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

router.delete('/:id', authenticateJWT, async (req, res) => {
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

router.patch('/:id', authenticateJWT, async (req, res) => {
    try {
        const orderId = req.params.id;
        const { quantity, bookId } = req.body;
        const book = await Book.findByPk(bookId);
        if (!book || (!quantity && !bookId) || quantity <= 0) {
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

module.exports = router;