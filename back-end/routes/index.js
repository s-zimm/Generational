var express = require('express');
var router = express.Router();

const User = require('../models/User');
const Prompt = require('../models/Prompt');
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
    });

router.route('/api/user_entries')
    .get((req, res) => {
        User_Entry.findAll()
        .then(allPrompts => res.json(allPrompts));
    });

router.route('/api/user_books')
    .get((req, res) => {
        User_Book.findAll()
            .then(allBooks => res.json(allBooks))
    })

module.exports = router;

// TODO: CHANGE RELATIONSHIP BETWEEN USER ENTRY AND BOOKID