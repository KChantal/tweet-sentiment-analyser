const Twitter = require('twitter');

const authController = { };




authController.OAuthRequest = (req, res, next) => {
    // verify user here 
    console.log("Attempting to verify user");
    return next();
}




module.exports = authController;