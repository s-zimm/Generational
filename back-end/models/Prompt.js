const Sequelize = require('sequelize');
const sequelize = require('../db');
const User_Written_Prompt = require('./User_Written_Prompt');

const Prompt = sequelize.define('prompt', {
    content: {
        type: Sequelize.STRING
    },
    chapter: {
        type: {
            type: Sequelize.INTEGER
        }
    }
});

Prompt.hasOne(User_Written_Prompt);

module.exports = Prompt;