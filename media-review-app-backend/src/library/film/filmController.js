const mediaPool = require('../../db/media_db');

const getFilmData = (filmUrl, callback) => {
    mediaPool.query(
        `SELECT * FROM media, films
         WHERE media.media_id = films.media_id
         AND media_url = $1`,
        [filmUrl],
        (err, res) => {
        if (err) {
            console.error('Error getting film:', err);
            callback(err, null);
        } else {
            console.log('Got film:', res.rows);
            callback(null, res.rows);
        }
        }
    );
    }

module.exports = {
    getFilmData,
}