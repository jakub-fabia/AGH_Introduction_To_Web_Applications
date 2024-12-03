const { Sequelize, DataTypes } = require('sequelize');

// Połączenie z SQLite (lub innym silnikiem bazy danych)
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
});

// Definicja modeli
const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

const Book = sequelize.define('Book', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

const Order = sequelize.define('Order', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

// Relacje: User - Order i Book - Order
User.hasMany(Order); // Użytkownik ma wiele zamówień
Order.belongsTo(User); // Zamówienie należy do użytkownika

Book.hasMany(Order); // Książka ma wiele zamówień
Order.belongsTo(Book); // Zamówienie należy do książki

// Eksportujemy sequelize oraz modele
module.exports = { sequelize, User, Book, Order };
