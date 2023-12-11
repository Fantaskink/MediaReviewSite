const express = require('express');
const router = express.Router();
const getUserController = require('./getUserController');
const verifyToken = require('./verifyToken');

router.get('/member/:slug', verifyToken, getUserController.getUserData);

module.exports = router;