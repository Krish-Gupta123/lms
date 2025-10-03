// Authentication and admin-check middleware
module.exports.ensureAuth = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized' });
};

module.exports.ensureAdmin = (req, res, next) => {
  console.log('ensureAdmin req.user:', req.user);
  if (req.user && (req.user.role === 'admin' || req.user.isAdmin)) {
    return next();
  }
  return res.status(403).json({ message: 'Forbidden: Admins only', user: req.user });
};
