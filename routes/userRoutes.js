const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, authorizeRole } = require('../middlewares/authMiddleware');

router.use(verifyToken);

// IT_SUPPORT saja yang boleh mengelola user
router.get('/', authorizeRole('IT Support'), userController.getAllUsers);
router.get('/:id', authorizeRole('IT Support'), userController.getUserById);
router.post('/', authorizeRole('IT Support'), userController.createUser);
router.put('/:id', authorizeRole('IT Support'), userController.updateUser);
router.delete('/:id', authorizeRole('IT Support'), userController.deleteUser);
// INI BARU
// INI BARU LAGI
// jahgsaub
// tssss

module.exports = router;