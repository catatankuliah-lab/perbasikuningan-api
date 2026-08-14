// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transactionController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.use(verifyToken);

router.post('/', TransactionController.createTransaction);
router.get('/', TransactionController.getTransactions);
router.get('/:id', TransactionController.getTransactionById);

module.exports = router;