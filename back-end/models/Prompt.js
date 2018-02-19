const Sequelize = require('sequelize');
const sequelize = require('../db/db');
const User_Written_Prompt = require('./User_Written_Prompt');

const Prompt = sequelize.define('prompt', {
    content: {
        type: Sequelize.STRING
    },
    chapter: {
        type: Sequelize.INTEGER
    }
});

Prompt.hasMany(User_Written_Prompt);

module.exports = Prompt;