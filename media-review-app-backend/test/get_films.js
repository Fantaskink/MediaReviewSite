const { Pool } = require('pg');

require('dotenv').config({
  path: `media-review-app-backend/.env.development`
});

const mediaPool = new Pool({
  user: process.env.MEDIA_DB_USER,
  host: process.env.MEDIA_DB_HOST,
  database: process.env.MEDIA_DB_NAME,
  password: process.env.MEDIA_DB_PASSWORD,
  port: Number(process.env.MEDIA_DB_PORT),
});

// Test the connection
mediaPool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
  } else {
    console.log('Connected to PostgreSQL:', res.rows[0].now);
  }
});

// Get all films
mediaPool.query(`
  SELECT * FROM media
  JOIN films ON media.media_id = films.media_id
`, (err, res) => {
  if (err) {
    console.error('Error getting films:', err);
  } else {
    console.log('Got films:', res.rows);
  }
});