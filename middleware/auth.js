const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = {
  // Protect routes - require authentication
  protect: async (req, res, next) => {
    try {
      const token = req.cookies.token;

      if (!token) {
        return res.status(401).render("login", {
          title: "Login",
          error: "Please log in to access this page",
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).render("login", {
          title: "Login",
          error: "User not found. Please log in again.",
        });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Auth middleware error:", error);
      res.status(401).render("login", {
        title: "Login",
        error: "Not authorized, token failed",
      });
    }
  },

  // Grant access to specific roles
  authorize: (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).render("error", {
          title: "Access Denied",
          message: "You do not have permission to perform this action",
        });
      }
      next();
    };
  },
};

module.exports = auth;
