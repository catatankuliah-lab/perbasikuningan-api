// routes/approvalLogRoutes.js
const express = require('express');
const router = express.Router();
const approvalLogController = require('../controllers/approvalLogController');
const { verifyToken, authorizeRole } = require('../middlewares/authMiddleware');

router.use(verifyToken);

// Hanya IT Support atau Bendahara yang bisa melihat semua riwayat log
router.get('/', authorizeRole('IT Support', 'Bendahara'), approvalLogController.getAllLogs);

// Melihat riwayat log untuk dokumen tertentu
router.get('/document/:document_id', approvalLogController.getLogsByDocumentId);

// Menambahkan log baru (ketika melakukan Approve/Reject)
router.post('/', authorizeRole('IT Support', 'Bendahara'), approvalLogController.createLog);

module.exports = router;