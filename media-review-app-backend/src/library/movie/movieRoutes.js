const express = require('express');
const router = express.Router();
const movieController = require('./movieController');

router.get('/movie/getdata/:movieUrl', (req, res) => {
    const movieUrl = req.params.movieUrl;
    
    movieController.getMovieData(movieUrl, (err, media) => {
        if (err) {
        return res.status(500).json({ error: 'Error fetching movie' });
        }
        res.json(media);
    });
    });

module.exports = router;