require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});
console.log(`Server is running in ${process.env.NODE_ENV} mode`);

const express = require('express');
const cors = require('cors');

const libraryRoutes = require('./library/libraryRoutes');
const filmRoutes = require('./library/film/filmRoutes');
const signUpRoutes = require('./auth/signUpRoutes');
const signInRoutes = require('./auth/signInRoutes');
const userRoutes = require('./auth/getUserRoutes');
const memberRoutes = require('./members/memberRoutes');

const app = express();
const port = 3000;

app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/api', libraryRoutes); // Use '/api' as a prefix for your routes if desired
app.use('/api', filmRoutes); 
app.use('/api', signUpRoutes); 
app.use('/api', signInRoutes);
app.use('/api', userRoutes);
app.use('/api', memberRoutes);


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
