// services/authService.js
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.loginUser = async (username, password) => {
  // 1. Cari user berdasarkan username
  const user = await User.findOne({ where: { username } });
  if (!user) {
    const err = new Error("Username atau password salah");
    err.status = 401;
    err.error_code = "INVALID_CREDENTIALS";
    throw err;
  }

  // 2. Cocokkan password yang diinput dengan password ter-hash di database
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const err = new Error("Username atau password salah");
    err.status = 401;
    err.error_code = "INVALID_CREDENTIALS";
    throw err;
  }

  // 3. Buat JWT Token (pastikan JWT_SECRET diset di .env lu)
  const tokenPayload = {
    id: user.id,
    username: user.username,
    role: user.role,
  };

  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET || "rahasia_hoki_steam", {
    expiresIn: "1d", // Token berlaku 1 hari
  });

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
    },
  };
};