// controllers/authController.js
const AuthService = require("../services/authService");

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      const err = new Error("Username dan password wajib diisi");
      err.status = 400;
      err.error_code = "MISSING_FIELDS";
      throw err;
    }

    const result = await AuthService.loginUser(username, password);

    res.status(200).json({
      success: true,
      message: "Login berhasil",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};