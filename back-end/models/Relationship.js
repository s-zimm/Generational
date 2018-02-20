const Sequelize = require('sequelize');
const sequelize = require('../db/db');
const User = require('./User')

const Relationship = sequelize.define('relationship', {
    relation: {
        type: Sequelize.STRING
    }
});

module.exports = Relationship;