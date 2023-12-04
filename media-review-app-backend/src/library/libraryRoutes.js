const express = require('express');
const router = express.Router();
const libraryController = require('./libraryController');

router.get('/library/getcards/:pageNumber', (req, res) => {
  const pageNumber = parseInt(req.params.pageNumber);

  if (isNaN(pageNumber) || pageNumber <= 0) {
    return res.status(400).json({ error: 'Invalid page number' });
  }

  libraryController.getLibraryCards(pageNumber, (err, media) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching library cards' });
    }
    res.json(media);
  });
});


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

router.post('/admin/addfilm', (req, res) => {
    const { media_url, title, thumbnail_url, description, director, year } = req.body;
    libraryController.addFilm(media_url, title, thumbnail_url, description, director, year, (err, media) => {
      if (err) {
        return res.status(500).json({ error: 'Error adding film' });
      }
      res.json(media);
    });
  });

router.post('/admin/addgame', (req, res) => {
    const { media_url, title, thumbnail_url, description, developer, year } = req.body;
    libraryController.addGame(media_url, title, thumbnail_url, description, developer, year, (err, media) => {
      if (err) {
        return res.status(500).json({ error: 'Error adding game' });
      }
      res.json(media);
    });
  });

module.exports = router;
