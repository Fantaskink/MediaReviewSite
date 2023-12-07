const express = require('express');
const router = express.Router();
const signUpController = require('./signUpController');

router.post('/signup', signUpController.signUp);

module.exports = router;