const Sequelize = require('sequelize');
const sequelize = require('../db/db');

const Prompt_Topic = sequelize.define('prompt_topic', {
    title: {
        type: Sequelize.STRING
    }
});

Prompt_Topic.hasMany(Prompt, { as: 'topic' });

module.exports = Prompt_Topic;