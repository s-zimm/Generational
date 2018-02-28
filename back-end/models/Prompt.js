const Sequelize = require('sequelize');
const sequelize = require('../db/db');
const User_Entry = require('./User_Entry');
const Completed_Prompt = require('./Completed_Prompt');

const Prompt = sequelize.define('prompt', {
    content: {
        type: Sequelize.STRING
    }
});

Prompt.hasMany(User_Entry);
Prompt.hasMany(Completed_Prompt);

module.exports = Prompt;