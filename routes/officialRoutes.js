const express = require('express');
const router = express.Router();
const officialController = require('../controllers/officialController');
const { verifyToken, authorizeRole } = require('../middlewares/authMiddleware');

router.use(verifyToken);

router.get('/', officialController.getAllOfficials);
router.get('/:id', officialController.getOfficialById);

// Hanya IT Support yang bisa mengelola data official
router.post('/', authorizeRole('IT Support'), officialController.createOfficial);
router.put('/:id', authorizeRole('IT Support'), officialController.updateOfficial);
router.delete('/:id', authorizeRole('IT Support'), officialController.deleteOfficial);

module.exports = router;