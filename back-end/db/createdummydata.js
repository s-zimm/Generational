const User = require('../models/User');
const Prompt = require('../models/Prompt');
const User_Book = require('../models/User_Book');
const User_Entry = require('../models/User_Entry');

User.bulkCreate([
    {
        firstname: 'Seth',
        lastname: 'Zimmerman',
        email: 'szim@gmail.com'
    },
    {
        firstname: 'Dev',
        lastname: 'Pascoe',
        email: 'dp@gmail.com'
    },
    {
        firstname: 'Chuster',
        lastname: 'Grub',
        email: 'cgrub@gmail.com'
    }
]).then(() => {
    User_Book.bulkCreate([
        {
            whoFor: 'Mother',
            userId: 1
        },
        {
            whoFor: 'Dad',
            userId: 2
        },
        {
            whoFor: 'Grandmother',
            userId: 3
        }
    ])
}).then(() => {
    Prompt.bulkCreate([
        {
            content: 'What sort of memz?',
            chapter: 1
        },
        {
            content: 'When did you meet?',
            chapter: 1
        }
    ])
}).then(() => {
    User_Entry.bulkCreate([
        {
            content: 'memmmmzmzzzzzzzzzzzz',
            userId: 1,
            userBookId: 1,
            promptId: 1
        },
        {
            content: 'I remember when...',
            userId: 2,
            userBookId: 2,
            promptId: 2
        }
    ])
});