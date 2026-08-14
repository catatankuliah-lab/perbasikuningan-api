// controllers/authController.js

// 1. TAMBAHKAN BARIS INI DI PALING ATAS
const AuthService = require("../services/authService"); 

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Validasi dasar
    if (!email || !password) {
      const err = new Error("Email dan password wajib diisi");
      err.status = 400;
      throw err;
    }

    // 2. Sekarang variabel AuthService akan dikenal
    const result = await AuthService.loginUser(email, password);

    res.status(200).json({
      success: true,
      message: "Login berhasil",
      data: result,
    });
  } catch (error) {
    next(error); // Error handler utama akan menangkap ini
  }
};