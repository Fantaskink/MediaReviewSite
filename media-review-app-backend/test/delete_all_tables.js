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

  /*
pool.query(`
  DROP TABLE IF EXISTS users;
  `
  ), (err, res) => {
    if (err) {
      console.error('Error deleting users table:', err);
    } else {
      console.log('Deleted users table:', res);
    }
  }

*/


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