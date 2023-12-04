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

// Get all films
pool.query(`
  SELECT * FROM media
  JOIN films ON media.media_id = films.media_id
`, (err, res) => {
  if (err) {
    console.error('Error getting films:', err);
  } else {
    console.log('Got films:', res.rows);
  }
});