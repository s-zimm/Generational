const Sequelize = require('sequelize');
const sequelize = require('../db/db');

const Prompt = require('./Prompt');

const Prompt_Topic = sequelize.define('prompt_topic', {
    content: {
        type: Sequelize.STRING
    },
    chapter: {
        type: Sequelize.INTEGER
    }
});

Prompt_Topic.hasMany(Prompt, { foreignKey: 'topicId' });

module.exports = Prompt_Topic;