const User = require('../models/User');
const Prompt = require('../models/Prompt');
const User_Book = require('../models/User_Book');
const User_Entry = require('../models/User_Entry');
const User_Book_Contributor = require('../models/User_Book_Contributor');
const Prompt_Topic = require('../models/Prompt_Topic');
const Relationship = require('../models/Relationship');
const Completed_Prompt = require('../models/Completed_Prompt');

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
    },
    {
        firstname: 'Jen',
        lastname: 'Grub',
        email: 'jgrub@gmail.com'
    },
    {
        firstname: 'Beverly',
        lastname: 'Pascoe',
        email: 'bpascoe@gmail.com'
    }
]).then(() => {
    User_Book.bulkCreate([
        {
            whoFor: 'Dev',
            ownerId: 1
        },
        {
            whoFor: 'Mom',
            ownerId: 2
        },
        {
            whoFor: 'Grandmother',
            ownerId: 3
        }
    ])
}).then(() => {
    Prompt_Topic.bulkCreate([
        {
            content: 'Early Years',
            chapter: 1
        },
        {
            content: 'Family History',
            chapter: 1
        },
        {
            content: 'Childhood Memories',
            chapter: 1
        },
        {
            content: 'Teenage Years',
            chapter: 2
        },
        {
            content: 'Crushes and Loves',
            chapter: 2
        }
    ])
}).then(() => {
    Prompt.bulkCreate([
        {
            content: 'What my name means, why it was chosen',
            topicId: 1
        },
        {
            content: 'A childhood experience that stands out',
            topicId: 1
        },
        {
            content: 'Who was your daddy?',
            topicId: 2
        },
        {
            content: 'Where were your parents from?',
            topicId: 2
        },
        {
            content: 'Where did you play when you were young?',
            topicId: 3
        },
        {
            content: `Write about a time when you did something you weren't supposed to.`,
            topicId: 4
        },
        {
            content: 'Who was your first crush?',
            topicId: 5
        }
    ])
}).then(() => {
    User_Entry.bulkCreate([
        {
            content: 'My name means a beautiful little flower',
            userId: 1,
            bookId: 1,
            promptId: 1
        },
        {
            content: 'I remember when...',
            userId: 1,
            bookId: 1,
            promptId: 2
        }
    ])
}).then(() => {
    Relationship.bulkCreate([
        {
            relation: 'Spouse',
            userId: 1,
            relatedUserId: 2
        },
        {
            relation: 'Son',
            userId: 3,
            relatedUserId: 4
        },
        {
            relation: 'Mother',
            userId: 5,
            relatedUserId: 2
        },
        {
            relation: 'Mother-In-Law',
            userId: 1,
            relatedUserId: 5
        }
    ])
}).then(() => {
    Completed_Prompt.bulkCreate([
        {
            userId: 1,
            promptId: 2
        }
    ]);
});