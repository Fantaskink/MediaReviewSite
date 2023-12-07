const pool = require('../db/user_db');

const signUp = async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        const user = await pool.query(
        'INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [userName, email, password]
        );
        res.status(200).json(user.rows[0]);
    } catch (error) {
        res.status(500).json(error);
    }
}
module.exports = signUp;