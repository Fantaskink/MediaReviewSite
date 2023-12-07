const pool = require('../db/user_db');
const bcrypt = require('bcrypt'); // For password hashing

const signUp = async (username, email_address, password) => {
  try {
    const usernameExists = await checkIfUsernameExists(username);
    if (usernameExists) {
      throw new Error('Username already exists');
    }

    const emailExists = await checkIfEmailExists(email_address);
    if (emailExists) {
      throw new Error('Email already exists');
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10); // You can adjust the salt rounds

    const user = await createUser(username, email_address, hashedPassword);
    return user;
  } catch (error) {
    throw error;
  }
};

const checkIfUsernameExists = async (username) => {
  try {
    const res = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return res.rows.length > 0;
  } catch (error) {
    console.error('Error checking if username exists:', error);
    throw error;
  }
};

const checkIfEmailExists = async (email_address) => {
  try {
    const res = await pool.query('SELECT * FROM users WHERE email_address = $1', [email_address]);
    return res.rows.length > 0;
  } catch (error) {
    console.error('Error checking if email exists:', error);
    throw error;
  }
};

const createUser = async (username, email_address, password) => {
  try {
    const res = await pool.query(
      'INSERT INTO users (username, email_address, password) VALUES ($1, $2, $3) RETURNING user_id',
      [username, email_address, password]
    );
    return res.rows[0]; // Return the first row as user data
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

module.exports = {
  signUp,
};
