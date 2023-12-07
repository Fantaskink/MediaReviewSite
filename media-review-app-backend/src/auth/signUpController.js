const pool = require('../db/user_db');

const signUp = (userName, email, password, callback) => {
    pool.query(
        `INSERT INTO users (user_name, email, password)
         VALUES ($1, $2, $3)
         RETURNING user_id`,
        [userName, email, password],
        (err, res) => {
            if (err) {
                console.error('Error signing up:', err);
                callback(err, null);
            } else {
                console.log('Signed up:', res.rows);
                callback(null, res.rows);
            }
        }
    );
}
module.exports = signUp;