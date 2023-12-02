const pool = require('../db/db');

const getAllMedia = (callback) => {
    pool.query(
      `SELECT * FROM media`,
      (err, res) => {
        if (err) {
          console.error('Error getting media:', err);
          callback(err, null);
        } else {
          console.log('Got media:', res.rows);
          callback(null, res.rows);
        }
      }
    );
  };

  const getAllMediaCount = (callback) => {
    pool.query(
      `SELECT COUNT(*) FROM media`,
      (err, res) => {
        if (err) {
          console.error('Error getting media:', err);
          callback(err, null);
        } else {
          const count = parseInt(res.rows[0].count, 10); // Extract the count value as an integer
          callback(null, count); // Send only the count value via callback
        }
      }
    );
  };
  

module.exports = {
    getAllMedia,
    getAllMediaCount
}