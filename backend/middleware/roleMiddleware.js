const allowRoles = (...roles) => {
  return (req, res, next) => {
    const userRole = String(req.user?.role || '')
      .trim()
      .toLowerCase();

    const allowedRoles = roles.map((role) =>
      String(role).trim().toLowerCase()
    );

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: 'Access denied'
      });
    }

    next();
  };
};

module.exports = allowRoles;