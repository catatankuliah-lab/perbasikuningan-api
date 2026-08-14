// routes/clubRoutes.js
const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubController');
const { verifyToken, authorizeRole } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// Semua endpoint di bawah ini mewajibkan user untuk login
router.use(verifyToken);

// Mengambil semua daftar klub (Bisa diakses oleh semua role yang sudah login)
router.get('/', clubController.getAllClubs);

// Mengambil detail klub berdasarkan ID
router.get('/:id', clubController.getClubById);

// Menambah klub baru (Hanya IT Support yang diizinkan)
// Menggunakan upload.single('logo_club') untuk menangani file gambar dari form-data
router.post(
  '/', 
  authorizeRole('IT Support'), 
  upload.single('logo_club'), 
  clubController.createClub
);

// Memperbarui data klub (Hanya IT Support yang diizinkan)
// Jika logo_club dikirim, middleware akan memproses file baru tersebut
router.put(
  '/:id', 
  authorizeRole('IT Support'), 
  upload.single('logo_club'), 
  clubController.updateClub
);

// Menghapus klub (Hanya IT Support yang diizinkan)
router.delete(
  '/:id', 
  authorizeRole('IT Support'), 
  clubController.deleteClub
);

module.exports = router;