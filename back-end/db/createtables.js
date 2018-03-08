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
    .then(() => User_Book.sync({ force: true }))
    .then(() => User_Entry.sync({ force: true }))
    .then(() => User_Book_Contributor.sync({ force: true }))
    .then(() => {
        Prompt.bulkCreate([
            {
                content: 'What my name means, why it was chosen',
                topicId: 1
            },
            {
                content: 'Where I was born',
                topicId: 1
            },
            {
                content: 'Major news event from the year I was born',
                topicId: 1
    
            },
            {
                content: 'My earliest memory',
                topicId: 1
            },
            {
                content: 'A story or song my parents liked to tell or sing to me',
                topicId: 1
            },
            {
                content: 'A childhood experience that stands out',
                topicId: 1
            },
            {
                content: 'Where I played when I was young',
                topicId: 1
            },
            {
                content: `My mother's and father's names`,
                topicId: 2
            },
            {
                content: 'How my parents met',
                topicId: 2
            },
            {
                content: 'A favorite story about my parents',
                topicId: 2
            },
            {
                content: `My siblings' names and something about them`,
                topicId: 2
            },
            {
                content: 'A story my parents never found out about',
                topicId: 2
            },
            {
                content: 'A favorite adventure with my siblings (or as an only child)',
                topicId: 2
            },
            {
                content: 'Those who were like family to me',
                topicId: 2
            },
            {
                content: 'Where I went to school (Elementary, High, College)',
                topicId: 3
            },
            {
                content: 'The best part of school',
                topicId: 3
            },
            {
                content: 'The toughest part of school',
                topicId: 3
            },
            {
                content: 'A class or teacher that opened my eyes',
                topicId: 3
            },
            {
                content: `My first 'real' love`,
                topicId: 4
            },
            {
                content: 'What the dating scene was like',
                topicId: 4
            },
            {
                content: 'My funniest or most awkward dating experiences',
                topicId: 4
            },
            {
                content: `My children[s] names and when they were born`,
                topicId: 5
            },
            {
                content: 'How my life changed when I became a parent',
                topicId: 5
            },
            {
                content: 'What I hope my children learn[ed] from me',
                topicId: 5
            },
            {
                content: 'A history-changing event in my lifetime',
                topicId: 7
            },
            {
                content: 'A positive impact that I made or would like to make',
                topicId: 7
            },
            {
                content: 'Great people I have met, events I was a part of',
                topicId: 7
            },
            {
                content: 'My first job ever',
                topicId: 6
            },
            {
                content: 'What I wanted to do when I grew up',
                topicId: 6
            },
            {
                content: 'My favorite job',
                topicId: 6
            },
            {
                content: 'My dream job',
                topicId: 6
            },
            {
                content: 'My idea of perfect happiness',
                topicId: 8
            },
            {
                content: 'My 10 proudest moments in life',
                topicId: 8
            },
            {
                content: 'My bucket list',
                topicId: 8
            },
            {
                content: 'A choice I made that was incredibly difficult. How I have learned from it',
                topicId: 9
            },
            {
                content: 'A difficult, funny, or embarrassing situation that gave me a new perspective',
                topicId: 9
            },
            {
                content: 'The most helpful counsel I have received',
                topicId: 9
            }
        ])
    })
    .then(() => console.log('Tables created!'));