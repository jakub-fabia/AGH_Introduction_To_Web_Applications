const { User, Book, Order, sequelize } = require('./sequelize');
const bcrypt = require('bcryptjs');

// Random data generator
async function seedDatabase() {
    try {
        console.log("Synchronizing DB...");
        await sequelize.sync({ force: true });
        console.log("DB has been cleared.");

        console.log("Adding users...");
        const user1Password = await bcrypt.hash('password123', 10);
        const user2Password = await bcrypt.hash('password456', 10);
        const user1 = await User.create({ email: 'user1@example.com', password: user1Password });
        const user2 = await User.create({ email: 'user2@example.com', password: user2Password });

        console.log("Adding books...");
        const book1 = await Book.create({ name: 'The Lord of the Rings', author: 'J. R. R. Tolkien', year: 1954 });
        const book2 = await Book.create({ name: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling', year: 1997 });
        const book3 = await Book.create({ name: 'Crime and Punishment', author: 'Fyodor Dostoevsky', year: 1866 });

        console.log("Adding orders...");
        await Order.create({ UserId: 1, BookId: 1, quantity: 1 });
        await Order.create({ UserId: 1, BookId: 2, quantity: 2 });
        await Order.create({ UserId: 2, BookId: 3, quantity: 1 });

    } catch (error) {
        console.error('Error during data creation:', error);
    } finally {
        await sequelize.close();
        console.log('Disconnected from the DB.');
    }
}

seedDatabase();
