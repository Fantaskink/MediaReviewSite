const express = require('express');
const router = express.Router();
const signUpController = require('./auth/signUpController');

router.post('/signup', (req, res) => {
    const { userName, email, password } = req.body;
    signUpController.signUp(userName, email, password, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Error signing up' });
        }
        res.json(user);
    });
});

module.exports = router;