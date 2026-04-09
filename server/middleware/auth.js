const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "") || req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token." });
  }
};
