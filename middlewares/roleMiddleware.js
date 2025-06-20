
const checkRole = (requiredRole) => {
    return (req, res, next) => {
      // req.user is set by authMiddleware after verifying JWT
      const user = req.user;
      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
  
      const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  
      if (!roles.includes(user.role)) {
        return res.status(403).json({ error: "Forbidden: Insufficient permissions" });
      }
  
      next();
    };
  };
  
  module.exports = checkRole;
  