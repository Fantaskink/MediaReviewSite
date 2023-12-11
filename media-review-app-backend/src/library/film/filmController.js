const mediaPool = require('../../db/media_db');

const getFilmData = (slug, callback) => {
    mediaPool.query(
        `SELECT * FROM media, films
         WHERE media.media_id = films.media_id
         AND slug = $1`,
        [slug],
        (err, res) => {
        if (err) {
            console.error('Error getting film:', err);
            callback(err, null);
        } else {
            console.log('Got film:', res.rows);
            callback(null, res.rows[0]);
        }
        }
    );
    }

module.exports = {
    getFilmData,
}