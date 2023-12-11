const pool = require('../db/user_db');

function getUserData(req, res) {
  const { slug } = req.params;
  pool.query('SELECT username, email_address, created_at, profile_picture_url FROM users WHERE username = $1', [slug], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows[0]);
  });
}

module.exports = {
  getUserData
}
