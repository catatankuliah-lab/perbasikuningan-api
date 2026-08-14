// services/authService.js
const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginUser = async (email, password) => {
  // Gunakan db.User
  const user = await db.User.findOne({ where: { email } });

  if (!user) {
    const err = new Error("Email atau password salah");
    err.status = 401;
    err.error_code = "INVALID_CREDENTIALS";
    throw err;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    const err = new Error("Email atau password salah");
    err.status = 401;
    err.error_code = "INVALID_CREDENTIALS";
    throw err;
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || "rahasia_hoki_steam",
    { expiresIn: "1d" }
  );
  return {
    token,
    user: { id: user.id, email: user.email, role: user.role, full_name: user.full_name }
  };
};