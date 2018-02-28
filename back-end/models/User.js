const Sequelize = require('sequelize');
const sequelize = require('../db/db');
const Relationship = require('./Relationship');
const Completed_Prompt = require('./Completed_Prompt');

const User = sequelize.define('user', {
    firstname: {
        type: Sequelize.STRING
    },
    lastname: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
});

User.hasMany(Relationship);
User.hasMany(Completed_Prompt);
User.hasOne(Relationship, { as: 'relatedUser'} )

module.exports = User;