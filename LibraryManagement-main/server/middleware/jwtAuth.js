const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

// Middleware to verify JWT token
function ensureJwtAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

// Middleware to check admin role in JWT
function ensureJwtAdmin(req, res, next) {
  ensureJwtAuth(req, res, function () {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Admin access required' });
    }
  });
}

module.exports = { ensureJwtAuth, ensureJwtAdmin };
