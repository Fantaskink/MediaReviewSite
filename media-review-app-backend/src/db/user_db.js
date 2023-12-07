const { Pool } = require('pg');

// Create a pool (recommended for managing connections)
const pool = new Pool({
  user: 'johan',
  host: 'localhost',
  database: 'users',
  password: '',
  port: 5432, // PostgreSQL default port
});

module.exports = pool;