const { Pool } = require('pg');

// Create a pool (recommended for managing connections)
const pool = new Pool({
  user: 'johan',
  host: 'localhost',
  database: 'media',
  password: '',
  port: 5432, // PostgreSQL default port
});

// Test the connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
  } else {
    console.log('Connected to PostgreSQL:', res.rows[0].now);
  }
});

function createFilm(media_url, title, thumbnail_url, description, director, year) {
    pool.query(`
      INSERT INTO media (media_url, title, thumbnail_url, description, type, year)
      VALUES ($1, $2, $3, $4, 'film', $5)
      RETURNING media_id
    `, [media_url, title, thumbnail_url, description, year], (err, res) => {
      if (err) {
        console.error('Error inserting film:', err);
      } else {
        const mediaId = res.rows[0].media_id;
        pool.query(`
          INSERT INTO films (director, media_id)
          VALUES ($1, $2)
        `, [director, mediaId], (err, res) => {
          if (err) {
            console.error('Error inserting film:', err);
          } else {
            console.log('Inserted film:', res);
          }
        });
      }
    });
  }
  
createFilm('barbie', 'Barbie', 'https://a.ltrbxd.com/resized/film-poster/2/7/7/0/6/4/277064-barbie-0-500-0-750-crop.jpg?v=1b83dc7a71', 'lorem ipsum', 'Greta Gerwig', 2023)
createFilm('oppenheimer', 'Oppenheimer', 'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg', 'lorem ipsum dolor', 'Christopher Nolan', 2023)
createFilm('inception', 'Inception', 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg', 'lorem ipsum dolor', 'Nolan', 2023)