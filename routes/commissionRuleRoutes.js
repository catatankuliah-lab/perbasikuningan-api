// routes/commissionRuleRoutes.js
const express = require('express');
const router = express.Router();
const CommissionRuleController = require('../controllers/commissionRuleController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.use(verifyToken);

router.get('/', CommissionRuleController.getRules);
router.get('/:id', CommissionRuleController.getRuleById);
router.post('/', CommissionRuleController.createRule);
router.put('/:id', CommissionRuleController.updateRule);
router.delete('/:id', CommissionRuleController.deleteRule);

module.exports = router;