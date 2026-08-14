// middlewares/uploadMiddleware.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Konfigurasi tempat penyimpanan & penamaan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/";
    // Membuat folder 'uploads' secara otomatis jika belum ada
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // Memberikan nama file yang unik: clubs-1726xxx-999.png
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "clubs-" + uniqueSuffix + path.extname(file.originalname));
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
  limits: { fileSize: 2 * 1024 * 1024 }, // Batas maksimal 2MB
  fileFilter: fileFilter 
});

module.exports = upload;