// services/paymentService.js
const { Payment, Document, User } = require("../models");

/**
 * Mengambil semua data pembayaran
 */
exports.findAll = async () => {
  return await Payment.findAll({
    include: [
      {
        model: Document,
        as: "document",
      },
      {
        model: User,
        as: "approver",
        attributes: ["id", "full_name", "email"],
      },
    ],
    order: [["created_at", "DESC"]],
  });
};

/**
 * Mencari satu pembayaran berdasarkan ID
 */
exports.findById = async (id) => {
  const payment = await Payment.findByPk(id, {
    include: [
      { model: Document, as: "document" },
      { model: User, as: "approver", attributes: ["id", "full_name", "email"] },
    ],
  });
  
  if (!payment) {
    const error = new Error("Pembayaran tidak ditemukan");
    error.status = 404;
    throw error;
  }
  
  return payment;
};

/**
 * Membuat data pembayaran baru
 */
exports.create = async (data) => {
  return await Payment.create(data);
};

/**
 * Memperbarui data pembayaran (biasanya untuk update status/notes)
 */
exports.update = async (id, data) => {
  const payment = await Payment.findByPk(id);
  
  if (!payment) {
    const error = new Error("Pembayaran tidak ditemukan");
    error.status = 404;
    throw error;
  }

  return await payment.update(data);
};

/**
 * Menghapus data pembayaran
 */
exports.delete = async (id) => {
  const payment = await Payment.findByPk(id);
  
  if (!payment) {
    const error = new Error("Pembayaran tidak ditemukan");
    error.status = 404;
    throw error;
  }

  return await payment.destroy();
};