var express = require('express');
const Sequelize = require('sequelize');
var router = express.Router();
const STRIPE_SECRET_KEY = require('../config').STRIPE_SECRET_KEY;
const cors = require('cors');
const stripe = require('stripe')(STRIPE_SECRET_KEY);
const path = require('path');
const Op = Sequelize.Op;

const User = require('../models/User');
const Prompt = require('../models/Prompt');
const Prompt_Topic = require('../models/Prompt_Topic');
const User_Book = require('../models/User_Book');
const User_Entry = require('../models/User_Entry');
const Relationship = require('../models/Relationship');
const User_Book_Contributor = require('../models/User_Book_Contributor');

router.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});


const postStripeCharge = res => (stripeErr, stripeRes) => {
    if (stripeErr) {
        res.status(500).send({ error: stripeErr });
    } else {
        res.status(200).send({ success: stripeRes });
    }
}

router.route('/fbid')
    .get((req, res) => {
        res.json({ fbId: req.user })
      });

router.route('/checkout')
    .get((req, res) => {
        res.send({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString()})
    })
    .post((req, res) => {
        stripe.charges.create(req.body, postStripeCharge(res));
    });

router.route('/api/user_entries/paid')
    .post((req, res) => {
        Promise.all(req.body.entryIdArray.map(id => {
            return User_Entry.findOne({
                where: { userId: req.body.userId, id: id }
            })
            .then(entry => entry.update({ paidFor: true }).then(data => {
                return data
            }))
        }))
        .then(data => res.json(data))
        .catch(err => console.log(err))
    })
    .get((req, res) => {
        User_Entry.findAll({
            where: { paidFor: true }
        })
        .then(entries => res.json(entries));
    });

router.route('/api/users')
    .get((req, res) => {
        User.findAll({ include: [{ all: true }]})
            .then(allUsers => res.json(allUsers));
    })
    .post((req, res) => {
        User.findOne({ where: { id: req.body.id }})
            .then(theUser => {
                theUser.update({
                    email: req.body.email
                })
                .then(data => res.json(data));
            });
    });

router.route('/api/users/relationships')
    .get((req, res) => {
        Relationship.findAll()
            .then(allRelations => res.json(allRelations));
    })

router.route('/api/users/relationships/create')
    .post((req, res) => {
        User.findOne({
            where: { email: req.body.relatedUserEmail }
        })
        .then(relatedUser => {
            Relationship.create({
                relation: req.body.relation,
                userId: req.body.currentUserId,
                relatedUserId: relatedUser.id
            })
            .then(data => res.json(data));
        }); 
    });

router.route('/api/users/relationships/delete')
    .post((req, res) => {
        Relationship.destroy({
            where: { id: req.body.relationId }
        })
        .then(data => res.json(data))
    });

router.route('/api/books/contributors')
    .get((req, res) => {
        User_Book_Contributor.findAll()
            .then(allContributors => res.json(allContributors));
    })
    .post((req, res) => {
        User_Book_Contributor.create({
            userId: req.body.contributorId,
            bookId: req.body.bookId
        })
        .then(data => res.json(data));
    });

router.route('/api/book/delete')
    .post((req, res) => {
        User_Book.destroy({ where: { id: req.body.id }})
        .then(data => res.json({ id: req.body.id }))
    })
    

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
                promptId: req.body.promptId,
                completed: req.body.completed
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

router.route('/api/entry/completed')
    .post((req, res) => {
        User_Entry.findOrCreate({
            where: { id: req.body.entryId}, defaults: {
                content: req.body.content,
                userId: req.body.userId,
                bookId: req.body.bookId,
                promptId: req.body.promptId,
                completed: req.body.completed
            }
        })
        .spread((entry, created) => {
            entry.update({
                content: req.body.content,
                userId: req.body.userId,
                bookId: req.body.bookId,
                promptId: req.body.promptId,
                completed: req.body.completed
            })
            .then(data => res.json(data));
        });
        
    });

router.route('/api/user_books')
    .get((req, res) => {
        User_Book.findAll({
            order: [
                ['id', 'DESC']
            ]
        })
        .then(allBooks => res.json(allBooks))
    })
    .post((req, res) => {
        User_Book.create({
            whoFor: req.body.whoFor,
            ownerId: req.body.ownerId
        })
        .then(data => res.json(data));
    })

router.route('/api/prompts') 
    .get((req, res) => {
        Prompt_Topic.findAll({ include: [{ all: true }]})
            .then(allPrompts => res.json(allPrompts));
    });

router.route('/api/justprompts')
    .get((req, res) => {
        Prompt.findAll()
            .then(prompts => res.json(prompts));
    });

module.exports = router;