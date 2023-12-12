const userPool = require('../db/user_db');

// Each page contains 50 members. The first page contains members 1-50, the second page contains members 51-100, etc.
const getMemberPage = (pageNumber, callback) => {
    const offset = (pageNumber - 1) * 50;
    userPool.query(
        `SELECT user_id, username, profile_picture_url FROM users
         ORDER BY username ASC LIMIT 50 OFFSET ${offset}`,
        (err, res) => {
            if (err) {
                console.error('Error getting users:', err);
                callback(err, null);
            } else {
                //console.log('Got media:', res.rows);
                console.log('Get user page')
                callback(null, res.rows);
            }
        }
    );
}

const getAllMembers = (callback) => {
    userPool.query(
        `SELECT * FROM users`,
        (err, res) => {
            if (err) {
                console.error('Error getting users:', err);
                callback(err, null);
            } else {
                console.log('Got users:', res.rows);
                callback(null, res.rows);
            }
        }
    );
};

const getAllMembersCount = (callback) => {
    userPool.query(
        `SELECT COUNT(*) FROM users`,
        (err, res) => {
            if (err) {
                console.error('Error getting users:', err);
                callback(err, null);
            } else {
                const count = parseInt(res.rows[0].count, 10); // Extract the count value as an integer
                callback(null, count); // Send only the count value via callback
            }
        }
    );
};

module.exports = {
    getMemberPage,
    getAllMembers,
    getAllMembersCount
}