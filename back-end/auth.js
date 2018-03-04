const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser')
const User = require('./models/User');
const facebook = require('./config').facebook;

const setupAuth = (app) => {
  app.use(cookieParser());

  app.use(session({
    secret: 'whatever',
    resave: true,
    saveUninitialized: true
  }));

  passport.use(new FacebookStrategy({
    clientID: facebook.CLIENT_ID,
    clientSecret: facebook.CLIENT_SECRET,
    callbackURL: facebook.callbackURL,
    profileFields: facebook.profileFields
  }, (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    User.findOrCreate({
      where: { facebookId: profile.id },
      defaults: {
        firstname: profile._json.first_name,
        lastname: profile._json.last_name,
        avatar: profile._json.picture.data.url,
        facebookId: profile._json.id,
        email: profile.emails
      }
  }).then(result => {
      // `findOrCreate` returns an array
      let user = result[0];
      return done(null, profile._json);
    })
    .catch(err => {
      console.log('that did not work');
      done(err, null);
    })
  }));

  passport.serializeUser(function(user, done) {
    console.log('we are serializing');
    console.log(user);
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log('we are deserializing');
    console.log(id);
    done(null, id);
  });

  app.use(passport.initialize());

  app.use(passport.session());

  app.get('/login', passport.authenticate('facebook'));

  app.get('/logout', function(req, res, next) {
    console.log('logging out');
    req.logout();
    res.redirect('/');
  });

  app.get('/auth/facebook',
    passport.authenticate('facebook', { failureRedirect: '/', scope: ['email'] }),
    (req, res) => {
      console.log('you just logged in');
      console.log(req.isAuthenticated());
      res.redirect('/');
    }
  );

  app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login', scope: ['email'] }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
}

const ensureAuthenticated = (req, res, next) => {

  if (req.isAuthenticated()) {
    // req.user is available for use here
    console.log('we are all good');
    return next();
  }

  console.log('clearly, they are not authenticated');
  // denied. redirect to login
  res.redirect('/login');
}

module.exports = setupAuth;
module.exports.ensureAuthenticated = ensureAuthenticated;