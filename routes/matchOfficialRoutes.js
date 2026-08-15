const express = require('express');
const router = express.Router();
const matchOfficialController = require('../controllers/matchOfficialController');
const { verifyToken, authorizeRole } = require('../middlewares/authMiddleware');

router.use(verifyToken);

router.get('/', matchOfficialController.getAllAssignments);

// Hanya IT Support yang bisa menugaskan wasit ke pertandingan
router.post('/', authorizeRole('IT Support'), matchOfficialController.assignOfficial);
router.delete('/:id', authorizeRole('IT Support'), matchOfficialController.removeAssignment);

module.exports = router;