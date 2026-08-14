// services/expenseService.js
const { Expense } = require("../models");
const fs = require("fs");
const path = require("path");

// 1. Ambil seluruh riwayat pengeluaran
exports.getAllExpenses = async () => {
  return await Expense.findAll({
    order: [["created_at", "DESC"]],
  });
};

// 2. Ambil detail pengeluaran berdasarkan ID
exports.getExpenseById = async (id) => {
  const expense = await Expense.findByPk(id);
  if (!expense) {
    const err = new Error("Data pengeluaran tidak ditemukan");
    err.status = 404;
    throw err;
  }
  return expense;
};

// 3. Tambah pengeluaran baru
exports.createExpense = async (payload, file) => {
  const { category, amount, description } = payload;

  if (!category || !amount) {
    // Jika gagal dan file sudah terlanjur ter-upload oleh multer, hapus file sisa
    if (file) fs.unlinkSync(file.path);
    const err = new Error("Kategori dan nominal pengeluaran wajib diisi");
    err.status = 400;
    throw err;
  }

  let receipt_image_url = null;
  if (file) {
    receipt_image_url = `/uploads/${file.filename}`;
  }

  return await Expense.create({
    category,
    amount,
    description: description || null,
    receipt_image_url,
  });
};

// 4. Edit data pengeluaran
exports.updateExpense = async (id, payload, file) => {
  const expense = await exports.getExpenseById(id);
  const { category, amount, description } = payload;

  expense.category = category !== undefined ? category : expense.category;
  expense.amount = amount !== undefined ? amount : expense.amount;
  expense.description = description !== undefined ? description : expense.description;

  // Jika ada file gambar baru yang di-upload
  if (file) {
    // Hapus file gambar lama jika ada
    if (expense.receipt_image_url) {
      const oldPath = path.join(__dirname, "../public", expense.receipt_image_url);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }
    expense.receipt_image_url = `/uploads/${file.filename}`;
  }

  await expense.save();
  return expense;
};

// 5. Hapus data pengeluaran
exports.deleteExpense = async (id) => {
  const expense = await exports.getExpenseById(id);

  // Hapus file fisik gambar jika ada
  if (expense.receipt_image_url) {
    const filePath = path.join(__dirname, "../public", expense.receipt_image_url);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  await expense.destroy();
  return { message: "Data pengeluaran berhasil dihapus" };
};