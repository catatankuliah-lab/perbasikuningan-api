// services/customerService.js
const {
  Customer,
  Transaction,
  TransactionItems,
  Product,
} = require("../models");
const { Op } = require("sequelize");

exports.getAllOrSearchCustomer = async (query = {}) => {
  const { page, limit, search } = query;

  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 10;
  const offset = (pageNum - 1) * limitNum;

  const whereClause = {};
  if (search) {
    whereClause[Op.or] = [
      { phone: { [Op.like]: `%${search}%` } },
      { vehicle_plate: { [Op.like]: `%${search}%` } },
      { name: { [Op.like]: `%${search}%` } },
    ];
  }

  const { count, rows } = await Customer.findAndCountAll({
    where: whereClause,
    limit: limitNum,
    offset: offset,
    order: [["created_at", "DESC"]],
    distinct: true,
  });

  const totalPages = Math.ceil(count / limitNum) || 1;

  return {
    data: rows,
    pagination: {
      total_data: count,
      total_pages: totalPages,
      current_page: pageNum,
      per_page: limitNum,
    },
  };
};

exports.createCustomer = async (data) => {
  const { name, phone, vehicle_plate } = data;

  if (phone) {
    const existing = await Customer.findOne({ where: { phone } });
    if (existing) {
      return existing;
    }
  }

  return await Customer.create({
    name,
    phone,
    vehicle_plate,
  });
};

// Ambil riwayat transaksi pelanggan secara aman (anti-error jika belum ada transaksi)
exports.getCustomerHistory = async (customerId) => {
  // 1. Ambil data utama pelanggan dulu (pasti aman & tidak error)
  const customer = await Customer.findByPk(customerId);

  if (!customer) {
    const err = new Error("Pelanggan tidak ditemukan");
    err.status = 404;
    throw err;
  }

  // 2. Ambil transaksi secara terpisah dengan try-catch, jadi kalau kosong / error tabel, tetap aman
  let transactions = [];
  try {
    transactions = await Transaction.findAll({
      where: { customer_id: customerId },
      include: [
        {
          model: TransactionItems,
          as: "items",
          required: false,
          include: [
            {
              model: Product,
              as: "product",
              required: false,
              attributes: ["id", "name", "category", "price"],
            },
          ],
        },
      ],
      order: [["created_at", "DESC"]],
    });
  } catch (err) {
    console.warn(
      "Warning: Belum ada transaksi atau tabel relasi belum siap:",
      err.message,
    );
  }

  // 3. Gabungkan hasilnya ke dalam satu objek JSON
  const customerData = customer.toJSON();
  customerData.transactions = transactions;

  return customerData;
};

exports.updateCustomer = async (id, payload) => {
  const customer = await Customer.findByPk(id);
  if (!customer) {
    const err = new Error("Pelanggan tidak ditemukan");
    err.status = 404;
    throw err;
  }

  const { name, phone, vehicle_plate } = payload;
  customer.name = name !== undefined ? name : customer.name;
  customer.phone = phone !== undefined ? phone : customer.phone;
  customer.vehicle_plate =
    vehicle_plate !== undefined ? vehicle_plate : customer.vehicle_plate;

  await customer.save();
  return customer;
};

exports.deleteCustomer = async (id) => {
  const customer = await Customer.findByPk(id);
  if (!customer) {
    const err = new Error("Pelanggan tidak ditemukan");
    err.status = 404;
    throw err;
  }

  await customer.destroy();
  return { message: "Pelanggan berhasil dihapus" };
};
