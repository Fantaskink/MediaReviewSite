const pool = require('../db/user_db');
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken');


const signIn = async (username, password) => {
    try {
        const user = await getUser(username);
        if (!user) {
        throw new Error('User not found');
        }
    
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
        throw new Error('Incorrect password');
        }
    
        const secret_key = process.env.JWT_SECRET;
        const token = jwt.sign({ id: user.id }, secret_key, { expiresIn: '30d' });
        
        return { token, user };
    } catch (error) {
        throw error;
    }
    }

const getUser = async (username) => {
    try {
        const res = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return res.rows[0];
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
    }


module.exports = {
    signIn
}