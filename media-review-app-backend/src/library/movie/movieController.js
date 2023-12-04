const pool = require('../db/db');

const getMovieData = (movieUrl, callback) => {
    pool.query(
        `SELECT * FROM media
         WHERE media_url = $1`,
        [movieUrl],
        (err, res) => {
        if (err) {
            console.error('Error getting movie:', err);
            callback(err, null);
        } else {
            console.log('Got movie:', res.rows);
            callback(null, res.rows);
        }
        }
    );
    }

module.exports = {
    getMovieData,
}