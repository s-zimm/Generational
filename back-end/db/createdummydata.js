const User = require('../models/User');
const Prompt = require('../models/Prompt');
const User_Book = require('../models/User_Book');
const User_Written_Prompt = require('../models/User_Written_Prompt');

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
    User_Written_Prompt.bulkCreate([

        {
            content: 'memmmmzmzzzzzzzzzzzz',
            userId: 1,
            user_bookId: 1,
            promptId: 2
        }
    ])
})