const { Pool } = require('pg');

// Create a pool (recommended for managing connections)
const mediaPool = new Pool({
  user: process.env.MEDIA_DB_USER,
  host: process.env.MEDIA_DB_HOST,
  database: process.env.MEDIA_DB_NAME,
  password: process.env.MEDIA_DB_PASSWORD,
  port: Number(process.env.MEDIA_DB_PORT),
});

module.exports = pool;