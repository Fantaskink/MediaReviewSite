const pool = require('../db/db');

const getAllMedia = (callback) => {
    pool.query(
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
    pool.query(
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
  
const addMovie = (title, thumbnail_url, description, director, year, callback) => {
    pool.query(
      `INSERT INTO media (title, thumbnail_url, description, type, year)
       VALUES ($1, $2, $3, 'movie', $4)
       RETURNING media_id`,
      [title, thumbnail_url, description, year],
      (err, res) => {
        if (err) {
          console.error('Error inserting movie:', err);
          callback(err, null);
        } else {
          const mediaId = res.rows[0].media_id;
          pool.query(
            `INSERT INTO movies (director, media_id)
             VALUES ($1, $2)`,
            [director, mediaId],
            (err, res) => {
              if (err) {
                console.error('Error inserting movie:', err);
                callback(err, null);
              } else {
                console.log('Inserted movie:', res);
                callback(null, res);
              }
            }
          );
        }
      }
    );
  };
  
  const addBook = (title, thumbnail_url, description, author, year, callback) => {
    pool.query(
      `INSERT INTO media (title, thumbnail_url, description, type, year)
       VALUES ($1, $2, $3, 'book', $4)
       RETURNING media_id`,
      [title, thumbnail_url, description, year],
      (err, res) => {
        if (err) {
          console.error('Error inserting book:', err);
          callback(err, null);
        } else {
          const mediaId = res.rows[0].media_id;
          pool.query(
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
    getAllMedia,
    getAllMediaCount,
    addMovie,
    addBook,
}