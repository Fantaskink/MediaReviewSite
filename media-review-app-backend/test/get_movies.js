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

// Get all movies
pool.query(`
  SELECT * FROM media
  JOIN movies ON media.media_id = movies.media_id
`, (err, res) => {
  if (err) {
    console.error('Error getting movies:', err);
  } else {
    console.log('Got movies:', res.rows);
  }
});