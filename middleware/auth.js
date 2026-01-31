const jwt = require("jsonwebtoken");
const db = require("../config/db");

// Middleware to protect routes by verifying the JWT token stored in cookies.
// Redirects to login if token is missing, invalid, or user is not found.
const protect = async (req, res, next) => {
  let token;

  if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const [rows] = await db.query("SELECT * FROM User WHERE id = ?", [
      decoded.id,
    ]);

    if (rows.length === 0) {
      res.clearCookie("token");
      return res.redirect("/login");
    }

    req.user = rows[0];
    next();
  } catch (error) {
    console.error(error);
    res.clearCookie("token");
    res.redirect("/login");
  }
};

module.exports = { protect };
