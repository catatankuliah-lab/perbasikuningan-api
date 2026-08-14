// routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customerController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.use(verifyToken);

router.get('/', CustomerController.getCustomers);
router.post('/', CustomerController.createCustomer);
router.get('/:id', CustomerController.getCustomerDetailWithHistory); // Mengambil detail + riwayat transaksi sekaligus
router.put('/:id', CustomerController.updateCustomer);
router.delete('/:id', CustomerController.deleteCustomer);

module.exports = router;