const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/twitter/callback', authController.verifyViaTwitter, (req, res, next) => {
    return next();
})



module.exports = router;