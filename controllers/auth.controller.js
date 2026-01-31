const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// Helper function to set the JWT token in an HTTP-only cookie.
const setCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};

// --- Views ---
// Renders the login page view.
getLoginPage = (req, res) => {
  res.render("auth/login");
};

// Renders the registration page view.
getRegisterPage = (req, res) => {
  res.render("auth/register");
};

// Handles user logout by clearing the authentication cookie and redirecting to login.
logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};

// --- Logic (UI) ---
// Registers a new user via the UI form.
registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      "INSERT INTO User (username, password) VALUES (?, ?)",
      [username, hashedPassword],
    );
    const id = result.insertId;

    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    setCookie(res, token);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.render("auth/register", {
      error: "User already exists or error occured",
    });
  }
};

// Authenticates a user via the UI login form.
loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await db.query("SELECT * FROM User WHERE username = ?", [
      username,
    ]);
    const user = rows[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      setCookie(res, token);
      res.redirect("/");
    } else {
      res.render("auth/login", { error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.render("auth/login", { error: "Something went wrong" });
  }
};

module.exports = {
  getLoginPage,
  getRegisterPage,
  logout,
  registerUser,
  loginUser,
};
