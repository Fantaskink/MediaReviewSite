const { Pool } = require('pg');

// Create a pool (recommended for managing connections)
const pool = new Pool({
  user: 'johan',
  host: 'localhost',
  database: 'johan',
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
function createGame(title, description, developer, year) {
  pool.query(`
    INSERT INTO media (title, description, type, year)
    VALUES ($1, $2, 'game', $3)
    RETURNING media_id
  `, [title, description, year], (err, res) => {
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

createGame('The Legend of Zelda: Breath of the Wild', 'lorem ipsum dolor sit amet', 'Nintendo', 2017)