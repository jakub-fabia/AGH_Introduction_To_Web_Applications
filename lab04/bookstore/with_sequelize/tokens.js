const jwt = require('jsonwebtoken');

const SECRET_KEY = 'go3yiewrhdgowyiesb3oewyrdfsibko78gyiw';

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(403).send('Access denied');
    }
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }
        req.user = user;
        next();
    });
};

const generateToken = (userId, email) => {
    return jwt.sign({ userId, email }, SECRET_KEY, { expiresIn: '1h' });
};

module.exports = {
    authenticateJWT,
    generateToken
};