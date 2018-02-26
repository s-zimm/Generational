var express = require('express');
var router = express.Router();

const User = require('../models/User');
const Prompt = require('../models/Prompt');
const Prompt_Topic = require('../models/Prompt_Topic');
const User_Book = require('../models/User_Book');
const User_Entry = require('../models/User_Entry');
const Relationship = require('../models/Relationship');

router.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
})

/* GET home page. */
router.route('/api/users')
    .get((req, res) => {
        User.findAll({ include: [{ all: true }]})
            .then(allUsers => res.json(allUsers));
    })
    .post((req, res) => {
        console.log(req.body)
    });

router.route('/api/users/relationships')
    .get((req, res) => {
        Relationship.findAll()
            .then(allRelations => res.json(allRelations));
    })
    .post((req, res) => {
        User.findOne({
            where: { email: req.body.userEmail }
        })
        .then(relatedUser => {
            Relationship.create({
                relation: req.body.relation,
                userId: req.body.currentUserId,
                relatedUserId: relatedUser.id
            });
        }); 
    });

router.route('/api/user_entries')
    .get((req, res) => {
        User_Entry.findAll()
        .then(allPrompts => res.json(allPrompts));
    })
    .post((req, res) => {
        User_Entry.findOrCreate({
            where: { id: req.body.entryId }, defaults: {
                content: req.body.content,
                userId: req.body.userId,
                bookId: req.body.bookId,
                promptId: req.body.promptId
            }
        })
        .spread((entry, created) => {
            entry.update({
                content: req.body.content,
                userId: req.body.userId,
                bookId: req.body.bookId,
                promptId: req.body.promptId
            })
            .then(data => res.json(data))
            
        });
    });

router.route('/api/user_books')
    .get((req, res) => {
        User_Book.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        })
            .then(allBooks => res.json(allBooks))
    })
    .post((req, res) => {
        console.log(req.body)
        User_Book.create({
            whoFor: req.body.whoFor,
            ownerId: req.body.ownerId
        })
    })

router.route('/api/prompts') 
    .get((req, res) => {
        Prompt_Topic.findAll({ include: [{ all: true }]})
            .then(allPrompts => res.json(allPrompts));
    });

module.exports = router;

// TODO: CHANGE RELATIONSHIP BETWEEN USER ENTRY AND BOOKID