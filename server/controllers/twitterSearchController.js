const db = require('../models/searchTermModel');
const fetch = require('node-fetch');
const Twit = require('twit');
const Sentiment = require('sentiment');

// Set up access to Twitter via Twit library
const T = new Twit({
    consumer_key: 'GGYozqZxAX7pgoFfOjunWA7XJ',
    consumer_secret: 'BQ57Zt3jdN8yVXbhfPwua8J65rypZG84LKZpnkWzd0uLcWY9jG',
    access_token: '1001060235681857536-Inm3ZLLoktAfghEuBErIfVqZluT9x0',
    access_token_secret: 'eX5SHrzqmuQiJzixBcsKtFLPTkXtPtklO9pbEhkd8zxYA',
    timeout_ms: 600000
})

// Set up instance of Sentiment
const sentiment = new Sentiment();


// Creating controller and adding methods
twitterSearchController = { };



twitterSearchController.getSearchTerm = async (req, res, next) => {
    try {
        console.log('Inside tSC.geSearchTerm');
        console.log(req.cookies.searchTerm);
        res.locals.searchPhrase = `${req.cookies.searchTerm}`;
        return next();
    } catch(err) {
        console.log(err);
        return next({
            error: `You received the following error: ${err}`
        });
    }       
}

twitterSearchController.searchTweets = async (req, res, next) => {
    try {
        console.log('Inside searchTweets');
        console.log('res.locals.searchPhrase', res.locals.searchPhrase);

        const tweetData = await T.get('search/tweets', { q: res.locals.searchPhrase, count: 200 }, (err, data, response) => {
            const statusInfo = data.statuses;

            // statusInfo.forEach(post => {
            //     console.log('Tweet text:  ', post.text);
            // })
            console.log(statusInfo.length);

            res.locals.tweets = statusInfo;
            res.locals.justText = statusInfo.map(obj => obj.text);
            return next();
        });

    } catch(err) {
        console.log(err);
        return next({
            error: `You received the following error: ${err}`
        });
    }
}

twitterSearchController.sentimentAnalysis = (req, res, next) => {
    try {
        const sentiments = res.locals.justText.map(post => {
            return sentiment.analyze(post, { language: 'en' });
        })
        res.locals.analysis = sentiments;
        return next();

    } catch(err) {
        console.log(err);
        return next({
            error: `You received the following error: ${err}`
        });
    }
}



module.exports = twitterSearchController;