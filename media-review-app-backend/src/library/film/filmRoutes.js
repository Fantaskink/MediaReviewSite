const express = require('express');
const router = express.Router();
const filmController = require('./filmController');

router.get('/film/getdata/:mediaURL', (req, res) => {
    const mediaURL = req.params.mediaURL;
    
    filmController.getFilmData(mediaURL, (err, media) => {
        if (err) {
        return res.status(500).json({ error: 'Error fetching film' });
        }
        res.json(media);
    });
    });

module.exports = router;