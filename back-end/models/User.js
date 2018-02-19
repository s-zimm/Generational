const Sequelize = require('sequelize');
const sequelize = require('../db/db');

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

module.exports = User;