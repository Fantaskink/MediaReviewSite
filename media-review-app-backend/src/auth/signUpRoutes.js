const express = require('express');
const router = express.Router();
const signUpController = require('./signUpController');

router.post('/signup', async (req, res) => {
    const { username, email_address, password } = req.body;
    if (!username || !email_address || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    try {
      const newUser = await signUpController.signUp(username, email_address, password);
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      // Handle errors and send appropriate error responses to the frontend
      res.status(400).json({ error: error.message }); // Sending the error message to the frontend
    }
  });

module.exports = router;