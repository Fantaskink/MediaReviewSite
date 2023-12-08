const mediaPool = require('../db/media_db');

// Each page contains 72 cards. The first page contains cards 1-72, the second page contains cards 73-144, etc.
const getLibraryCards = (pageNumber, callback) => {
    const offset = (pageNumber - 1) * 72;
    mediaPool.query(
        `SELECT media_id, slug, title, thumbnail_url, type FROM media
         ORDER BY title ASC LIMIT 72 OFFSET ${offset}`,
        (err, res) => {
            if (err) {
                console.error('Error getting media:', err);
                callback(err, null);
            } else {
                //console.log('Got media:', res.rows);
                console.log('Get library cards')
                callback(null, res.rows);
            }
        }
    );
}

const getAllMedia = (callback) => {
    mediaPool.query(
      `SELECT * FROM media`,
      (err, res) => {
        if (err) {
          console.error('Error getting media:', err);
          callback(err, null);
        } else {
          console.log('Got media:', res.rows);
          callback(null, res.rows);
        }
      }
    );
  };

  const getAllMediaCount = (callback) => {
    mediaPool.query(
      `SELECT COUNT(*) FROM media`,
      (err, res) => {
        if (err) {
          console.error('Error getting media:', err);
          callback(err, null);
        } else {
          const count = parseInt(res.rows[0].count, 10); // Extract the count value as an integer
          callback(null, count); // Send only the count value via callback
        }
      }
    );
  };
  
const addFilm = (slug, title, thumbnail_url, description, director, year, callback) => {
    mediaPool.query(
      `INSERT INTO media (slug, title, thumbnail_url, description, type, year)
       VALUES ($1, $2, $3, $4, 'film', $5)
       RETURNING media_id`,
      [slug, title, thumbnail_url, description, year],
      (err, res) => {
        if (err) {
          console.error('Error inserting film:', err);
          callback(err, null);
        } else {
          const mediaId = res.rows[0].media_id;
          mediaPool.query(
            `INSERT INTO films (director, media_id)
             VALUES ($1, $2)`,
            [director, mediaId],
            (err, res) => {
              if (err) {
                console.error('Error inserting film:', err);
                callback(err, null);
              } else {
                console.log('Inserted film:', res);
                callback(null, res);
              }
            }
          );
        }
      }
    );
  };
  
  const addBook = (slug, title, thumbnail_url, description, author, year, callback) => {
    mediaPool.query(
      `INSERT INTO media (slug, title, thumbnail_url, description, type, year)
       VALUES ($1, $2, $3, $4, 'book', $5)
       RETURNING media_id`,
      [slug, title, thumbnail_url, description, year],
      (err, res) => {
        if (err) {
          console.error('Error inserting book:', err);
          callback(err, null);
        } else {
          const mediaId = res.rows[0].media_id;
          mediaPool.query(
            `INSERT INTO books (author, media_id)
             VALUES ($1, $2)`,
            [author, mediaId],
            (err, res) => {
              if (err) {
                console.error('Error inserting book:', err);
                callback(err, null);
              } else {
                console.log('Inserted book:', res);
                callback(null, res);
              }
            }
          );
        }
      }
    );
  };
  

module.exports = {
    getLibraryCards,
    getAllMedia,
    getAllMediaCount,
    addFilm,
    addBook,
}