const User = require('../models/User');
const Prompt = require('../models/Prompt');
const User_Book = require('../models/User_Book');
const User_Entry = require('../models/User_Entry');
const User_Book_Contributor = require('../models/User_Book_Contributor');
const Relationship = require('../models/Relationship');
const Prompt_Topic = require('../models/Prompt_Topic');

User.sync({ force: true })
    .then(() => Relationship.sync({ force: true }))
    .then(() => Prompt_Topic.sync({ force: true }))
    .then(() => Prompt.sync({ force: true }))
    .then(() => User_Entry.sync({ force: true }))
    .then(() => User_Book.sync({ force: true }))
    .then(() => User_Book_Contributor.sync({ force: true }))
    .then(() => console.log('Tables created!'));