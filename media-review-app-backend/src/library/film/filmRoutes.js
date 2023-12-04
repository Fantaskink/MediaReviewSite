const express = require('express');
const router = express.Router();
const filmController = require('./filmController');

router.get('/film/getdata/:filmURL', (req, res) => {
    const filmURL = req.params.filmURL;
    
    filmController.getFilmData(filmURL, (err, media) => {
        if (err) {
        return res.status(500).json({ error: 'Error fetching film' });
        }
        res.json(media);
    });
    });

module.exports = router;