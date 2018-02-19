const Sequelize = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const User_Book = require('./User_Book');

const User_Written_Prompt = sequelize.define('user_written_prompt', {
    content: {
        type: Sequelize.STRING
    }
});

User_Written_Prompt.belongsTo(User);
User_Written_Prompt.belongsTo(User_Book);
