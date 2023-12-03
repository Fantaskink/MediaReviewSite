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

// Add game
function createGame(title, thumbnail_url, description, developer, year) {
  pool.query(`
    INSERT INTO media (title, thumbnail_url, description, type, year)
    VALUES ($1, $2, $3, 'game', $4)
    RETURNING media_id
  `, [title, thumbnail_url, description, year], (err, res) => {
    if (err) {
      console.error('Error inserting game:', err);
    } else {
      const mediaId = res.rows[0].media_id;
      pool.query(`
        INSERT INTO games (developer, media_id)
        VALUES ($1, $2)
      `, [developer, mediaId], (err, res) => {
        if (err) {
          console.error('Error inserting game:', err);
        } else {
          console.log('Inserted game:', res);
        }
      });
    }
  });
}

createGame('The Legend of Zelda: Breath of the Wild', 'thumbnail_placeholder', 'lorem ipsum dolor sit amet', 'Nintendo', 2017)