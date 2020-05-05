const Twitter = require('twitter');

const authController = { };

const client = new Twitter({
    consumer_key: 'GGYozqZxAX7pgoFfOjunWA7XJ',
    consumer_secret: 'BQ57Zt3jdN8yVXbhfPwua8J65rypZG84LKZpnkWzd0uLcWY9jG',
    access_token_key: '1001060235681857536-Inm3ZLLoktAfghEuBErIfVqZluT9x0',
    access_token_secret: 'eX5SHrzqmuQiJzixBcsKtFLPTkXtPtklO9pbEhkd8zxYA'
  });



authController.verifyViaTwitter = (req, res, next) => {
    // verify user here 
    console.log("Attempting to verify user");
    return next();
}




module.exports = authController;