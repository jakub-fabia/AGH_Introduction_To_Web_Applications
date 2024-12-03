const db = require("./init_db");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function registerUser(email, password) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
            if (err) {
                return reject(new Error('Error checking user existence: ' + err.message));
            }
            if (row) {
                return reject(new Error('User with given email is already registered.'));
            }
            db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], function (err) {
                if (err) {
                    return reject(new Error('Error registering user: ' + err.message));
                }
                resolve(this.lastID);
            });
        });
    });
}

function loginUser(email, password) {
    return new Promise((resolve, reject) => {
        db.get('SELECT userID, email, password FROM users WHERE email = ?', [email], (err, row) => {
            if (err) {
                return reject(new Error('Error querying database: ' + err.message));
            }

            if (!row) {
                return resolve({ success: false, message: 'Invalid email or password!' });
            }

            if (row.password === password) { // Plaintext comparison
                const token = jwt.sign(
                    { userID: row.userID, email: row.email },
                    process.env.JWT_SECRET || 'default_secret',
                    { expiresIn: '1h' }
                );

                return resolve({
                    success: true,
                    message: 'Login successful',
                    token: token
                });
            } else {
                return resolve({ success: false, message: 'Invalid email or password!' });
            }
        });
    });
}

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'Missing or invalid token' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET || 'default_secret', (err, user) => {
        if (err) {
            return res.status(403).send({ message: 'Invalid or expired token' });
        }
        req.user = user; // Attach the decoded token data to the request
        next();
    });
};

module.exports = {
    registerUser,
    loginUser,
    verifyToken
};
