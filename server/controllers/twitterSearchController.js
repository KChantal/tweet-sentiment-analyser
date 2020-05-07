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

// Get today's date
const currentDate = new Date();
console.log(currentDate);
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();
let today;

month < 10 && day < 10 ? today = `${year}-0${month}-0${day}` :
month < 10 && day > 9 ? today =  `${year}-0${month}-${day}` :
month > 9 && day < 10 ? today =  `${year}-${month}-0${day}` :
today =  `${year}-${month}-${day}`;

console.log(today);


// const str = "Wow, happy nice lovely wonderful amazing love love love like";
// console.log(sentiment.analyze(str));

// Sentiment.analyze returns object with:
/*
score: num
comparative: float,
calculation : [ {token: score }],
tokens: [ array of tokens ],
words: [ array of words ],
positive: [ array of all tokens calculated as positive ],
negative: [ array of all tokens calculated as negative ]
*/


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

        for (let i = 1; i < 9; i++) {
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
                        // res.locals.tweets.forEach(arr => {
                        //     arr.forEach(post => {
                        //         console.log(post.created_at);
                        //     })
                        // })
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
        // auxiliary function to filter each tweet to just text and date
        const filterKeys = (object) => {
          const filteredObj = { };
          for (key in object) {
            if (key === 'created_at') {
              filteredObj.created_at = object[key];
            } 
            if (key === 'text') {
              filteredObj.text = object[key];
            }
          }
          return filteredObj;
        }
        // Find the most frequently occurring words in the pos and neg arrays
        const findWordMode = (arr) => {
          const cache = { };
          const modeWords = [];
          
          arr.forEach(word => {
              if (!cache[word]) cache[word] = 1;
              else cache[word]++;
          })
          const max = Math.max(...Object.values(cache));

          for (key in cache) {
              if (cache[key] === max) modeWords.push(key); 
          }
          return modeWords;
        }

        // object to hold avergae score for a certain date/time
        const allTweets = res.locals.tweets;
        const scoresAndTimes = [];
        const justTextAndDates = [];

        // Data returned from Twitter required:
        // time and data created
        // post.created_at: 'Thu Apr 30 23:32:55 +0000 2020' (first 9 chars = date)
        // text from tweet
        // post.text = 'blah blah'
        // could potentially filter by lang='en' (but not vital for now)

        // go through each tweet inside the tweets array and filter each 
        // tweet by just time created and tweet text
        for (let i = 0; i < allTweets.length; i++) { 
            const tweetArray = allTweets[i];
            const dayArray = [];
            for (let j = 0; j < tweetArray.length; j++) {
                dayArray.push(filterKeys(tweetArray[j]));
            } 
            // keep the original arrays together and in the same order, so group the data
            justTextAndDates.push(dayArray);
        }
        // console.log(justTextAndDates);
        
        // for each array, push the date into scoresAndTimes array
        justTextAndDates.forEach(arr => {
            const justDate = arr[0].created_at.slice(0, 10);
            scoresAndTimes.push({ date: justDate });
        })

        let count = 0;
        const positiveWordsArr = [];
        const negativeWordsArr = [];

        // get average sentiment analysis score for each day 
        // and push to scoresAndTimes array
        justTextAndDates.forEach(tweetArr => {
            const averageScore = tweetArr.reduce((acc, curr) => {
                const txtContent = curr.text;
                const positiveWords = sentiment.analyze(txtContent).positive;
                const negativeWords = sentiment.analyze(txtContent).negative;
                positiveWordsArr.push(...positiveWords);
                negativeWordsArr.push(...negativeWords);

                let analysisScore = sentiment.analyze(txtContent).score;
                if (typeof analysisScore === 'number') {
                    if (analysisScore > 5) analysisScore = 5;
                    else if (analysisScore < -5) analysisScore = -5;
                    acc += analysisScore;
                    return acc;
                }
            }, 0)
            console.log(averageScore);
            scoresAndTimes[count].avgScore = (averageScore);
            count++;
        })

        console.log(scoresAndTimes);

        const mostFreqPositive = findWordMode(positiveWordsArr);
        const mostFreqNegative = findWordMode(negativeWordsArr);

        console.log('Most frequently occurring positive words: ', mostFreqPositive);
        console.log('Most frequently occurring negative words: ', mostFreqNegative);


        res.locals.wordArrays = {
            positiveWords: mostFreqPositive,
            negativeWords: mostFreqNegative
        }
        res.locals.sentimentData = scoresAndTimes;

        return next();

    } catch(err) {
        console.log(err);
        return next({
            error: `You received the following error: ${err}`
        });
    }
}



module.exports = twitterSearchController;