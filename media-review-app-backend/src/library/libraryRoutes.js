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

router.post('/admin/addmovie', (req, res) => {
    const { title, thumbnail_url, description, director, year } = req.body;
    libraryController.addMovie(title, thumbnail_url, description, director, year, (err, media) => {
      if (err) {
        return res.status(500).json({ error: 'Error adding movie' });
      }
      res.json(media);
    });
  });

router.post('/admin/addgame', (req, res) => {
    const { title, thumbnail_url, description, developer, year } = req.body;
    libraryController.addGame(title, thumbnail_url, description, developer, year, (err, media) => {
      if (err) {
        return res.status(500).json({ error: 'Error adding game' });
      }
      res.json(media);
    });
  });

module.exports = router;
