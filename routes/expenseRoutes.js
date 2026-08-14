// routes/expenseRoutes.js
const express = require("express");
const router = express.Router();
const ExpenseController = require("../controllers/expenseController");
const { verifyToken } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

router.use(verifyToken);

router.get("/", ExpenseController.getExpenses);
router.post("/", upload.single("receipt_image"), ExpenseController.createExpense);
router.put("/:id", upload.single("receipt_image"), ExpenseController.updateExpense);
router.delete("/:id", ExpenseController.deleteExpense);

module.exports = router;