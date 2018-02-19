const Sequelize = require('sequelize');
const sequelize = require('../db/db');
const User = require('./User');

const User_Book = sequelize.define('user_book', {
    whoFor: {
        type: Sequelize.TEXT
    }
});

User_Book.belongsTo(User, { as: 'owner' });

module.exports = User_Book;