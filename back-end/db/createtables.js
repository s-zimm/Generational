const User = require('../models/User');
const Prompt = require('../models/Prompt');
const User_Book = require('../models/User_Book');
const User_Entry = require('../models/User_Entry');
const User_Book_Contributor = require('../models/User_Book_Contributor');

User.sync({ force: true })
    .then(() => Prompt.sync({ force: true }))
    .then(() => User_Book.sync({ force: true }))
    .then(() => User_Entry.sync({ force: true }))
    .then(() => User_Book_Contributor.sync({ force: true }))
    .then(() => console.log('Tables created!'));