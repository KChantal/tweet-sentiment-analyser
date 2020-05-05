const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
// const Twitter = require('twitter');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const session = require('cookie-session');

// const client = new Twitter({
//     consumer_key: 'GGYozqZxAX7pgoFfOjunWA7XJ',
//     consumer_secret: 'BQ57Zt3jdN8yVXbhfPwua8J65rypZG84LKZpnkWzd0uLcWY9jG',
//     access_token_key: '1001060235681857536-Inm3ZLLoktAfghEuBErIfVqZluT9x0',
//     access_token_secret: 'eX5SHrzqmuQiJzixBcsKtFLPTkXtPtklO9pbEhkd8zxYA'
// });

router.use(session({ 
    secret: 'someGenericSecret', 
    resave: true, 
    saveUninitialized: true 
}));
router.use(passport.initialize());
router.use(passport.session());


passport.use(new TwitterStrategy({
    consumerKey: 'GGYozqZxAX7pgoFfOjunWA7XJ',
    consumerSecret: 'BQ57Zt3jdN8yVXbhfPwua8J65rypZG84LKZpnkWzd0uLcWY9jG',
    callbackURL: 'http://localhost:3000/api/twitter/callback',
    proxy: true
    },
    function(token, tokenSecret, profile, done) {
        console.log('User found: ', profile.username);
        return done(null, profile);
    }
));

passport.serializeUser((user, callback) => {
    callback(null, user);
});
passport.deserializeUser((user, callback) => {
    callback(null, user);
});



router.get('/twitter/login', passport.authenticate('twitter'), (req, res) => {
    return res.redirect('/');
});

router.get('/twitter/callback', 
    passport.authenticate('twitter', { failureRedirect: '/' }),
    (req, res) => {
        res.json('Boooooyahh succeeeeess')
    });


module.exports = router;