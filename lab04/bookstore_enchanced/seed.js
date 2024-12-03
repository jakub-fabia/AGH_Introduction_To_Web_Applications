const { User, Book, Order, sequelize } = require('./sequelize'); // Importujemy modele
const bcrypt = require('bcryptjs');

// Funkcja do tworzenia przykładowych danych
async function seedDatabase() {
    try {
        console.log("Synchronizowanie bazy danych...");
        // Synchronizacja bazy danych (utworzenie tabel, jeśli nie istnieją)
        await sequelize.sync({ force: true }); // 'force: true' usuwa istniejące tabele i tworzy je od nowa

        console.log("Baza danych została zresetowana.");

        // Dodanie użytkowników
        console.log("Dodawanie użytkowników...");
        const user1Password = await bcrypt.hash('password123', 10);
        const user2Password = await bcrypt.hash('password456', 10);

        const user1 = await User.create({ email: 'user1@example.com', password: user1Password });
        const user2 = await User.create({ email: 'user2@example.com', password: user2Password });

        console.log("Dodano użytkowników:", user1.email, user2.email);

        // Dodanie książek
        console.log("Dodawanie książek...");
        const book1 = await Book.create({ name: 'Władca Pierścieni', author: 'J.R.R. Tolkien', year: 1954 });
        const book2 = await Book.create({ name: 'Harry Potter i Kamień Filozoficzny', author: 'J.K. Rowling', year: 1997 });
        const book3 = await Book.create({ name: 'Zbrodnia i kara', author: 'Fiodor Dostojewski', year: 1866 });

        console.log("Dodano książki:", book1.name, book2.name, book3.name);

        // Dodanie zamówień
        console.log("Dodawanie zamówień...");
        await Order.create({ UserId: 1, BookId: 1, quantity: 1 });
        await Order.create({ UserId: 1, BookId: 2, quantity: 2 });
        await Order.create({ UserId: 2, BookId: 3, quantity: 1 });

        console.log("Dodano zamówienia");

    } catch (error) {
        console.error('Błąd przy tworzeniu danych:', error);
    } finally {
        // Zamknięcie połączenia z bazą danych
        await sequelize.close();
        console.log('Połączenie z bazą danych zostało zamknięte.');
    }
}

// Uruchomienie funkcji
seedDatabase();
