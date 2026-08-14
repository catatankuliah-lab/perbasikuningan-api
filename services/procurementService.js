// services/procurementService.js
const { Procurement, Product } = require("../models");
const { Op } = require("sequelize");

exports.getAllOrSearchProcurements = async (query = {}) => {
  const { page, limit, search } = query;

  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 10;
  const offset = (pageNum - 1) * limitNum;

  const productWhere = {};
  if (search) {
    productWhere.name = { [Op.like]: `%${search}%` };
  }

  const { count, rows } = await Procurement.findAndCountAll({
    include: [
      {
        model: Product,
        as: "product",
        where: productWhere,
        attributes: ["id", "name", "category", "price", "stock"],
      },
    ],
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

exports.getProcurementById = async (id) => {
  const procurement = await Procurement.findByPk(id, {
    include: [{ model: Product, as: "product" }],
  });

  if (!procurement) {
    const err = new Error("Data barang masuk tidak ditemukan");
    err.status = 404;
    throw err;
  }
  return procurement;
};

exports.createProcurement = async (data) => {
  const { product_id, qty, total_cost } = data;

  // 1. Simpan riwayat procurement
  const procurement = await Procurement.create({
    product_id,
    qty,
    total_cost,
  });

  // 2. Otomatis tambahkan stok produk terkait
  const product = await Product.findByPk(product_id);
  if (product) {
    product.stock = Number(product.stock || 0) + Number(qty);
    await product.save();
  }

  return procurement;
};

exports.deleteProcurement = async (id) => {
  const procurement = await Procurement.findByPk(id);
  if (!procurement) {
    const err = new Error("Data barang masuk tidak ditemukan");
    err.status = 404;
    throw err;
  }

  // Kurangi kembali stok produk jika data procurement dihapus
  const product = await Product.findByPk(procurement.product_id);
  if (product) {
    product.stock = Math.max(0, Number(product.stock || 0) - Number(procurement.qty || 0));
    await product.save();
  }

  await procurement.destroy();
  return { message: "Data barang masuk berhasil dihapus" };
};