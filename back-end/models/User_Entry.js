const Sequelize = require('sequelize');
const sequelize = require('../db/db');
const User = require('./User');
const User_Book = require('./User_Book');
const Prompt = require('./Prompt');

const User_Entry = sequelize.define('user_entry', {
    content: {
        type: Sequelize.STRING
    },
    completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    paidFor: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

User_Entry.belongsTo(User);
User_Entry.belongsTo(User_Book, { as: 'book' });

module.exports = User_Entry;