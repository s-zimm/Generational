const Sequelize = require('sequelize');
const sequelize = new Sequelize('generational', 'sethzimmerman', '', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;