const Sequelize = require('sequelize');
const sequelize = require('../db/db');
const User = require('./User');
const User_Book = require('./User_Book');
const Prompt = require('./Prompt');

const User_Written_Prompt = sequelize.define('user_written_prompt', {
    content: {
        type: Sequelize.STRING
    }
});

User_Written_Prompt.belongsTo(User);
User_Written_Prompt.belongsTo(User_Book, { as: 'book' });

module.exports = User_Written_Prompt;