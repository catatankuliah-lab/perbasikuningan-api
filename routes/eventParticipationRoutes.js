const express = require('express');
const router = express.Router();
const participationController = require('../controllers/eventParticipationController');
const { verifyToken, authorizeRole } = require('../middlewares/authMiddleware');

router.use(verifyToken);

router.get('/', participationController.getAllParticipations);
router.get('/:id', participationController.getParticipationById);

// Hanya IT Support yang bisa mendaftarkan klub ke event
router.post('/', authorizeRole('IT Support'), participationController.createParticipation);
router.delete('/:id', authorizeRole('IT Support'), participationController.deleteParticipation);

module.exports = router;