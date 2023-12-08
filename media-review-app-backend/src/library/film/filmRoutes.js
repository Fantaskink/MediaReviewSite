const express = require('express');
const router = express.Router();
const filmController = require('./filmController');

router.get('/film/getdata/:slug', (req, res) => {
    const slug = req.params.slug;
    
    filmController.getFilmData(slug, (err, media) => {
        if (err) {
        return res.status(500).json({ error: 'Error fetching film' });
        }
        res.json(media);
    });
    });

module.exports = router;