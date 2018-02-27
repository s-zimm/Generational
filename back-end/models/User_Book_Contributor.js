const Sequelize = require('sequelize');
const sequelize = require('../db/db');
const User = require('./User');
const User_Book = require('./User_Book');

const User_Book_Contributor = sequelize.define('user_book_contributor', {});

User_Book_Contributor.belongsTo(User);
User_Book_Contributor.belongsTo(User_Book, { as: 'book' });

module.exports = User_Book_Contributor;