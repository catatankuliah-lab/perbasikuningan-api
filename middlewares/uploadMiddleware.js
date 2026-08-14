// middlewares/uploadMiddleware.js
const multer = require("multer");
const path = require("path");

// Konfigurasi tempat penyimpanan & penamaan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/"); // Pastikan folder public/uploads sudah ada di root project
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "expense-" + uniqueSuffix + path.extname(file.originalname));
  },
});

// Filter hanya memperbolehkan file gambar
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Hanya file gambar (jpg, jpeg, png) yang diperbolehkan!"), false);
  }
};

const upload = multer({ 
  storage: storage, 
  limits: { fileSize: 2 * 1024 * 1024 }, // Maksimal 2MB
  fileFilter: fileFilter 
});

module.exports = upload;