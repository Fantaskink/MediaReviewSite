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

// Delete all tables
pool.query(`
  DROP TABLE IF EXISTS logs;
  DROP TABLE IF EXISTS books;
  DROP TABLE IF EXISTS movies;
  DROP TABLE IF EXISTS games;
  DROP TABLE IF EXISTS media;
`, (err, res) => {
  if (err) {
    console.error('Error deleting tables:', err);
  } else {
    console.log('Deleted tables:', res);
  }
});