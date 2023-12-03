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

// Create media table
pool.query(`
  CREATE TABLE IF NOT EXISTS media (
    media_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    thumbnail_url text,
    description text,
    type VARCHAR(255) NOT NULL,
    year INTEGER,
    rating DECIMAL(3, 2)
  );
`, (err, res) => {
  if (err) {
    console.error('Error creating media table:', err);
  } else {
    console.log('Created media table:', res);
  }
});

// Create books table
pool.query(`
    CREATE TABLE IF NOT EXISTS books (
        book_id SERIAL PRIMARY KEY,
        author VARCHAR(255) NOT NULL,
        media_id INTEGER REFERENCES media(media_id)
    );
`, (err, res) => {
    if (err) {
        console.error('Error creating books table:', err);
    } else {
        console.log('Created books table:', res);
    }
    });

    

// Create movies table
pool.query(`
  CREATE TABLE IF NOT EXISTS movies (
    movie_id SERIAL PRIMARY KEY,
    director VARCHAR(255) NOT NULL,
    media_id INTEGER REFERENCES media(media_id)
  );
`, (err, res) => {
  if (err) {
    console.error('Error creating movies table:', err);
  } else {
    console.log('Created movies table:', res);
  }
});

// Create logs table
pool.query(`
  CREATE TABLE IF NOT EXISTS logs (
    log_id SERIAL PRIMARY KEY,
    media_id INTEGER REFERENCES media(media_id),
    rating DECIMAL(2, 1),
    review VARCHAR(255) NOT NULL
  );
`, (err, res) => {
  if (err) {
    console.error('Error creating logs table:', err);
  } else {
    console.log('Created logs table:', res);
  }
});

// Create games table
pool.query(`
  CREATE TABLE IF NOT EXISTS games (
    game_id SERIAL PRIMARY KEY,
    developer VARCHAR(255) NOT NULL,
    media_id INTEGER REFERENCES media(media_id)
  );
`, (err, res) => {
  if (err) {
    console.error('Error creating games table:', err);
  } else {
    console.log('Created games table:', res);
  }
});


