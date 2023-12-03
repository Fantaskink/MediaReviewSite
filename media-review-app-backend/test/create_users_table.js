const { Pool } = require('pg');

// Create a pool (recommended for managing connections)
const pool = new Pool({
  user: 'johan',
  host: 'localhost',
  database: 'users',
  password: '',
  port: 5432, // PostgreSQL default port
});

// Create users table
pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(32) NOT NULL,
    email_address VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    profile_picture_url text
  );
`, (err, res) => {
  if (err) {
    console.error('Error creating users table:', err);
  } else {
    console.log('Created users table:', res);
  }
});