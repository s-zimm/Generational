const Sequelize = require('sequelize');
const sequelize = require('../db/db');

const Completed_Prompt = sequelize.define('completed_prompt', {});

module.exports = Completed_Prompt;