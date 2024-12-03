const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, Book, Order, sequelize } = require('./sequelize'); // Importujemy modele i sequelize
const app = express();
const port = 3000;

// Middleware do obsługi JSON
app.use(bodyParser.json());

// Funkcja do generowania tokenu JWT
const generateToken = (userId, email) => {
    return jwt.sign({ userId, email }, 'your_secret_key', { expiresIn: '1h' });
};

// Middleware do ochrony tras (weryfikacja tokenu)
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(403).send('Access denied');
    }

    jwt.verify(token, 'your_secret_key', (err, user) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }
        req.user = user; // Przechowujemy dane użytkownika w req.user
        next();
    });
};
// Pobranie wszystkich książek
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Pobranie jednej książki na podstawie ID
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

// Dodanie nowej książki
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

// Usunięcie książki na podstawie ID
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



// ------------------------ PUNKT 2 - Obsługa zamówień ------------------------

// Pobranie wszystkich zamówień użytkownika
app.get('/api/orders/:userId', authenticateJWT, async (req, res) => {
    const { userId } = req.params;
    try {
        const userOrders = await User.findOne({
            where: { id: userId },
            include: {
                model: Order,
                include: Book // Łączenie z książkami
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

// Dodanie zamówienia
app.post('/api/orders', authenticateJWT, async (req, res) => {
    const { userId, bookId, quantity } = req.body;
    try {
        // Sprawdzamy, czy książka i użytkownik istnieją
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

// Usunięcie zamówienia
app.delete('/api/orders/:id', authenticateJWT, async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findByPk(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Zamówienie nie znalezione' });
        }

        // Usunięcie zamówienia
        await order.destroy();
        res.status(200).json({ message: 'Zamówienie usunięte' });
    } catch (error) {
        console.error('Błąd przy usuwaniu zamówienia:', error);
        res.status(500).json({ message: 'Błąd serwera' });
    }
});

// Aktualizacja zamówienia (PATCH)
app.patch('/api/orders/:id', authenticateJWT, async (req, res) => {
    try {
        const orderId = req.params.id;
        const { quantity, bookId } = req.body; // Ilość do zaktualizowania

        if (!quantity || quantity <= 0) {
            return res.status(400).json({ message: 'Ilość musi być większa niż 0' });
        }

        const order = await Order.findByPk(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Zamówienie nie znalezione' });
        }

        // Aktualizacja ilości zamówienia
        order.quantity = quantity;
        order.BookId = bookId
        console.log(order);
        console.log(bookId)
        await order.save();

        res.status(200).json({ message: 'Zamówienie zaktualizowane', order });
    } catch (error) {
        console.error('Błąd przy aktualizacji zamówienia:', error);
        res.status(500).json({ message: 'Błąd serwera' });
    }
});

// ------------------------ PUNKT 3 - Obsługa użytkowników ------------------------

// Rejestracja użytkownika
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Haszowanie hasła
        const newUser = await User.create({ email, password: hashedPassword });
        res.json({ userId: newUser.id });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Logowanie użytkownika
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).send('Cant find user under that email');
        }

        const isMatch = await bcrypt.compare(password, user.password); // Porównanie hasła
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }

        // Generowanie tokenu
        const token = generateToken(user.id, email);

        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// ------------------------ Ustawienie portu ------------------------

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
