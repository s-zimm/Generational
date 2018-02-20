const Sequelize = require('sequelize');
const sequelize = require('../db/db');
// const Relationship = require('./Relationship');

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

// User.hasMany(Relationship);

module.exports = User;