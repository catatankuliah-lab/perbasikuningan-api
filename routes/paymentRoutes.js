// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { verifyToken, authorizeRole } = require('../middlewares/authMiddleware');

// Proteksi semua endpoint payment
router.use(verifyToken);

// Mengambil semua daftar payment (Biasanya oleh Admin/Finance)
router.get('/', authorizeRole('IT Support', 'Bendahara'), paymentController.getAllPayments);

// Mengambil detail payment
router.get('/:id', paymentController.getPaymentById);

// Submit payment baru
router.post('/', paymentController.createPayment);

// Update status payment (Hanya IT Support/Finance untuk Approve/Reject)
router.put('/:id', authorizeRole('IT Support', 'Bendahara'), paymentController.updatePayment);

// Hapus data payment
router.delete('/:id', authorizeRole('IT Support'), paymentController.deletePayment);

module.exports = router;