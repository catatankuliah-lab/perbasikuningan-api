// controllers/expenseController.js
const ExpenseService = require("../services/expenseService");

exports.getExpenses = async (req, res, next) => {
  try {
    const data = await ExpenseService.getAllExpenses();
    res.json({ success: true, message: "Daftar pengeluaran berhasil diambil", data });
  } catch (error) {
    next(error);
  }
};

exports.createExpense = async (req, res, next) => {
  try {
    const data = await ExpenseService.createExpense(req.body, req.file);
    res.status(201).json({ success: true, message: "Pengeluaran berhasil dicatat", data });
  } catch (error) {
    next(error);
  }
};

exports.updateExpense = async (req, res, next) => {
  try {
    const data = await ExpenseService.updateExpense(req.params.id, req.body, req.file);
    res.json({ success: true, message: "Pengeluaran berhasil diperbarui", data });
  } catch (error) {
    next(error);
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const data = await ExpenseService.deleteExpense(req.params.id);
    res.json({ success: true, message: data.message });
  } catch (error) {
    next(error);
  }
};