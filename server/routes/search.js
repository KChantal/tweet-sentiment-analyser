const express = require('express');
// const Twitter = require('twitter');
const cookieParser = require('cookie-parser');
const Sentiment = require('sentiment');

const router = express.Router();
const twitterSearchController = require('../controllers/twitterSearchController');

router.use(cookieParser());

router.get('/search', 
    twitterSearchController.getSearchTerm, 
    twitterSearchController.searchTweets, 
    twitterSearchController.sentimentAnalysis, 
    (req, res) => {
        
        console.log('Success in \'getSearchTerm\'');
        res.clearCookie("searchTerm");
        res.cookie("hasResults", true, { httpOnly: false, maxAge: 900000 });
        res.cookie("sentimentData", res.locals.sentimentData, { httpOnly: false, maxAge: 900000 });
        res.cookie("words", res.locals.wordArrays, { httpOnly: false, maxAge: 900000 });
        res.status(200);
        return res.redirect('/main');
});


module.exports = router;