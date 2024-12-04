const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
});

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

User.hasMany(Order);
Order.belongsTo(User);

Book.hasMany(Order);
Order.belongsTo(Book);

module.exports = { sequelize, User, Book, Order };
