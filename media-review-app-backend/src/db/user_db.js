const { Pool } = require('pg');

// Create a pool (recommended for managing connections)
const usersPool = new Pool({
  user: process.env.USERS_DB_USER,
  host: process.env.USERS_DB_HOST,
  database: process.env.USERS_DB_NAME,
  password: process.env.USERS_DB_PASSWORD,
  port: Number(process.env.USERS_DB_PORT),
});

module.exports = usersPool;