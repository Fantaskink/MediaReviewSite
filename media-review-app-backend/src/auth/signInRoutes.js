const express = require('express');
const router = express.Router();
const signInController = require('./signInController');

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    try {
      const { user, token } = await signInController.signIn(username, password);
      res.status(201).json({
        message: 'User signed in successfully',
        token,
        user: {
          id: user.user_id,
          username: user.username,
          email: user.email,
          // Include any other user fields you want to return here
        },
      });
    } catch (error) {
      // Handle errors and send appropriate error responses to the frontend
      res.status(400).json({ error: error.message }); // Sending the error message to the frontend
    }
  } );

module.exports = router;