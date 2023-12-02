const express = require('express');
const cors = require('cors');
const libraryRoutes = require('./library/libraryRoutes');


const app = express();
const port = 3000;


app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/api', libraryRoutes); // Use '/api' as a prefix for your routes if desired


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
