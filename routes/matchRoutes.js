const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const { verifyToken, authorizeRole } = require('../middlewares/authMiddleware');

router.use(verifyToken);

router.get('/', matchController.getAllMatches);
router.get('/:id', matchController.getMatchById);

// Hanya IT Support yang bisa mengelola jadwal dan skor pertandingan
router.post('/', authorizeRole('IT Support'), matchController.createMatch);
router.put('/:id', authorizeRole('IT Support'), matchController.updateMatch);
router.delete('/:id', authorizeRole('IT Support'), matchController.deleteMatch);

module.exports = router;