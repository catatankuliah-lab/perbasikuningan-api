const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubController');
const { verifyToken, authorizeRole } = require('../middlewares/authMiddleware');

router.use(verifyToken);

// Mengikuti pola IT Support yang bisa mengelola
router.get('/', clubController.getAllClubs);
router.get('/:id', clubController.getClubById);
router.post('/', authorizeRole('IT Support'), clubController.createClub);
router.put('/:id', authorizeRole('IT Support'), clubController.updateClub);
router.delete('/:id', authorizeRole('IT Support'), clubController.deleteClub);

module.exports = router;