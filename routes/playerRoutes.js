const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');
const { verifyToken, authorizeRole } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.use(verifyToken);

router.get('/', playerController.getAllPlayers);
router.get('/:id', playerController.getPlayerById);

// Gunakan upload.fields untuk menangani dua field file yang berbeda
const playerUpload = upload.fields([
  { name: 'identity_photo', maxCount: 1 },
  { name: 'ktp_file', maxCount: 1 }
]);

router.post('/', authorizeRole('IT Support'), playerUpload, playerController.createPlayer);
router.put('/:id', authorizeRole('IT Support'), playerUpload, playerController.updatePlayer);
router.delete('/:id', authorizeRole('IT Support'), playerController.deletePlayer);

module.exports = router;