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

function createMovie(title, thumbnail_url, description, director, year) {
    pool.query(`
      INSERT INTO media (title, thumbnail_url, description, type, year)
      VALUES ($1, $2, $3, 'movie', $4)
      RETURNING media_id
    `, [title, thumbnail_url, description, year], (err, res) => {
      if (err) {
        console.error('Error inserting movie:', err);
      } else {
        const mediaId = res.rows[0].media_id;
        pool.query(`
          INSERT INTO movies (director, media_id)
          VALUES ($1, $2)
        `, [director, mediaId], (err, res) => {
          if (err) {
            console.error('Error inserting movie:', err);
          } else {
            console.log('Inserted movie:', res);
          }
        });
      }
    });
  }
  
createMovie('Barbie', 'thumnail_placeholder', 'lorem ipsum', 'Greta Gerwig', 2023)
createMovie('Oppenheimer', 'thumbnail_url', 'lorem ipsum dolor', 'Christopher Nolan', 2023)