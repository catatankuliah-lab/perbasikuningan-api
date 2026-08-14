// routes/employeeCommissionRoutes.js
const express = require('express');
const router = express.Router();
const EmployeeCommissionController = require('../controllers/employeeCommissionController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.use(verifyToken);

router.get('/summary', EmployeeCommissionController.getSummary);
router.post('/pay', EmployeeCommissionController.payCommission);

module.exports = router;