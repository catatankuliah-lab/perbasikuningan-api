// services/productService.js
const { Product } = require("../models");
const { Op } = require("sequelize");

// Ambil semua produk / layanan dengan opsi filter & pagination
exports.getAllProducts = async (query = {}) => {
  const { page, limit, search, category, is_active } = query;

  // Jika tidak ada parameter pagination sama sekali, kembalikan semua data
  if (!page && !limit && !search && !category && is_active === undefined) {
    return await Product.findAll({ order: [["category", "ASC"], ["name", "ASC"]] });
  }

  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 10;
  const offset = (pageNum - 1) * limitNum;

  // Susun kondisi filter (Where clause Sequelize)
  const whereClause = {};

  if (search) {
    whereClause.name = { [Op.like]: `%${search}%` };
  }

  if (category) {
    whereClause.category = category;
  }

  if (is_active !== undefined && is_active !== "") {
    whereClause.is_active = is_active === "1" || is_active === true;
  }

  const { count, rows } = await Product.findAndCountAll({
    where: whereClause,
    limit: limitNum,
    offset: offset,
    order: [["category", "ASC"], ["name", "ASC"]],
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

// Ambil detail produk berdasarkan ID
exports.getProductById = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) {
    const err = new Error("Produk atau layanan tidak ditemukan");
    err.status = 404;
    throw err;
  }
  return product;
};

// Tambah produk baru
exports.createProduct = async (payload) => {
  try {
    const { name, category, price, stock, is_active } = payload;
    return await Product.create({
      name,
      category,
      price: price || 0,
      stock: stock !== undefined && stock !== "" ? stock : 0,
      is_active: is_active !== undefined ? is_active : true,
    });
  } catch (error) {
    console.error("❌ DETAIL ERROR SQL SEQUELIZE:", error.original || error);
    throw error;
  }
};

// Update produk berdasarkan ID
exports.updateProduct = async (id, payload) => {
  const product = await exports.getProductById(id);
  const { name, category, price, stock, is_active } = payload;

  product.name = name !== undefined ? name : product.name;
  product.category = category !== undefined ? category : product.category;
  product.price = price !== undefined ? price : product.price;
  product.stock = stock !== undefined && stock !== "" ? stock : product.stock;
  product.is_active = is_active !== undefined ? is_active : product.is_active;

  await product.save();
  return product;
};

// Hapus produk berdasarkan ID
exports.deleteProduct = async (id) => {
  const product = await exports.getProductById(id);
  await product.destroy();
  return { message: "Produk berhasil dihapus" };
};