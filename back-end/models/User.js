const Sequelize = require('sequelize');
const sequelize = require('../db/db');
const Relationship = require('./Relationship');

const User = sequelize.define('user', {
    firstname: {
        type: Sequelize.STRING
    },
    lastname: {
        type: Sequelize.STRING
    },
    avatar: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    facebookId: {
        type: Sequelize.BIGINT
    }
});

User.hasMany(Relationship);
User.hasOne(Relationship, { as: 'relatedUser'} )

module.exports = User;