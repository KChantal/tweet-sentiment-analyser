const express = require('express');
// const Twitter = require('twitter');
const Sentiment = require('sentiment');

const router = express.Router();
const twitterSearchController = require('../controllers/twitterSearchController');

router.get('/search', 
    twitterSearchController.getSearchTerm, 
    twitterSearchController.searchTweets, 
    twitterSearchController.sentimentAnalysis, 
    (req, res) => {
        console.log('Success in \'getSearchTerm\'');
        return res.status(200).json(res.locals.analysis); 
});


module.exports = router;