// JWT secret key for signing tokens
require('dotenv').config();
module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'fallback-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h'
};
