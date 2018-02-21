const Sequelize = require('sequelize');
const sequelize = require('../db/db');
const User_Entry = require('./User_Entry');

const Prompt = sequelize.define('prompt', {
    content: {
        type: Sequelize.STRING
    }
});

Prompt.hasMany(User_Entry);

module.exports = Prompt;