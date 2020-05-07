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

const currentDate = new Date();
console.log(currentDate);
const year = currentDate.getFullYear();
const month = currentDate.getMonth();
const day = currentDate.getDate();
let today;

month < 10 && day < 10 ? today = `${year}-0${month}-0${day}` :
month < 10 && day > 9 ? today =  `${year}-0${month}-${day}` :
month > 9 && day < 10 ? today =  `${year}-${month}-0${day}` :
today =  `${year.toString()}-${month.toString()}-${day.toString()}`;

console.log(today);

// Creating controller and adding methods
twitterSearchController = { };



twitterSearchController.getSearchTerm = async (req, res, next) => {
    try {
        console.log('Inside tSC.geSearchTerm');
        console.log(req.cookies.searchTerm);
        res.locals.searchPhrase = `#${req.cookies.searchTerm}`;
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

        // Get tweets from each day over the past 7 days 
        // maybe turn this into Promise.all ??

        const tweetPromiseArray = [];

        // since:2020-04-01

        for (let i = 1; i < 8; i++) {
            tweetPromiseArray.push(
                new Promise((resolve, reject) => {
                    T.get('search/tweets', { q: `${res.locals.searchPhrase}`, count: 100, until: `2020-05-0${i}` }, (err, data, response) => {
                        const statusInfo = data.statuses;
                        resolve(statusInfo);
                    })
                })
            )
        }
        
        await Promise.all(tweetPromiseArray)
                    .then(values => {
                        res.locals.tweets = values;
                        res.locals.tweets.forEach(arr => {
                            arr.forEach(post => {
                                console.log(post.created_at);
                            })
                        })
                    })
                    .catch(err => {
                        console.error(err);
                    });
        
        return next();

    } catch(err) {
        console.log(err);
        return next({
            error: `You received the following error: ${err}`
        });
    }
}

twitterSearchController.sentimentAnalysis = (req, res, next) => {
    try {
        const averageScores = [];

        

        // const sentiments = res.locals.justText.map(post => {
        //     return sentiment.analyze(post, { language: 'en' });
        // })
        // res.locals.analysis = sentiments;
        return next();

    } catch(err) {
        console.log(err);
        return next({
            error: `You received the following error: ${err}`
        });
    }
}



module.exports = twitterSearchController;