const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("Auth Header:", authHeader); // Debugging line

  if (!authHeader) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  console.log("Extracted Token:", token); // Debugging line

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("JWT Verification Error:", err); // Debugging line
      return res.status(401).json({ message: "Invalid token." });
    }

    req.userId = decoded.id; // Assuming the token contains user ID
    next();
  });
};
 module.exports = authenticateJWT;