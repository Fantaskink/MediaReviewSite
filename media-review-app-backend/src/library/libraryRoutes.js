const express = require('express');
const router = express.Router();
const libraryController = require('./libraryController');

// Route to get all library media
router.get('/library/getall', (req, res) => {
    // Use the getAllGames function and provide a callback
    libraryController.getAllMedia((err, media) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching games' });
      }
      res.json(media);
    });
  });

// Route to get all library media count
router.get('/library/getallcount', (req, res) => {
    // Use the getAllGames function and provide a callback
    libraryController.getAllMediaCount((err, media) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching games' });
      }
      res.json(media);
    });
  });

// Route to create a new library item
//router.post('/', libraryController.createItem);

// Add more routes as needed for updating, deleting, etc.

module.exports = router;
