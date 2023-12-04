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
function createGame(media_url, title, thumbnail_url, description, developer, year) {
  pool.query(`
    INSERT INTO media (media_url, title, thumbnail_url, description, type, year)
    VALUES ($1, $2, $3, $4, 'game', $5)
    RETURNING media_id
  `, [media_url, title, thumbnail_url, description, year], (err, res) => {
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

createGame('the-legend-of-zelda-breath-of-the-wild', 'The Legend of Zelda: Breath of the Wild', 'https://cdn02.plentymarkets.com/qozbgypaugq8/item/images/1613/full/PSTR-ZELDA005.jpg', 'lorem ipsum dolor sit amet', 'Nintendo', 2017)
createGame('super-mario-odyssey', 'Super Mario Odyssey', 'https://static.posters.cz/image/750/plakater/super-mario-odyssey-collage-i50045.jpg', 'lorem ipsum dolor sit amet', 'Nintendo', 2017)