const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../config');
const User = require('../models/user');

// Login controller using JWT
debugger;
exports.loginWithJwt = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Replace with your password check logic
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // JWT payload
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role || 'user',
      name: user.name
    };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });
    res.json({ token, user: payload });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Example protected route using JWT
exports.protectedWithJwt = (req, res) => {
  res.json({ message: 'JWT protected route accessed', user: req.user });
};
