const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    // Demo only: the client supplies this header. It is NOT secure authentication.
    const userRole = req.headers["x-role"];

    if (!userRole) {
      return res.status(400).json({
        message: "Please provide an x-role header"
      });
    }

    if (!allowedRoles.includes(userRole.toLowerCase())) {
      return res.status(403).json({
        message: "You do not have permission to perform this action"
      });
    }

    req.userRole = userRole.toLowerCase();
    next();
  };
};

module.exports = authorizeRole;
