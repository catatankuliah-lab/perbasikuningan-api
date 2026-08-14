// services/inventoryService.js
const { Product, Procurement, sequelize } = require("../models");
const { Op } = require("sequelize");

// 1. Ambil seluruh daftar stok / inventaris
exports.getAllInventory = async () => {
  return await Product.findAll({
    order: [["name", "ASC"]],
  });
};

// 2. Tambah item produk/bahan baku baru
exports.createProduct = async (payload) => {
  const { name, category, price, stock, min_stock } = payload;
  
  return await Product.create({
    name,
    category,
    price: price || 0.00,
    stock: stock || 0,
    min_stock: min_stock !== undefined ? min_stock : 5,
  });
};

// 3. Update info produk atau batas minimum stok
exports.updateProduct = async (id, payload) => {
  const product = await Product.findByPk(id);
  if (!product) {
    const err = new Error("Produk atau item inventaris tidak ditemukan");
    err.status = 404;
    throw err;
  }

  const { name, category, price, stock, min_stock } = payload;

  product.name = name !== undefined ? name : product.name;
  product.category = category !== undefined ? category : product.category;
  product.price = price !== undefined ? price : product.price;
  product.stock = stock !== undefined ? stock : product.stock;
  product.min_stock = min_stock !== undefined ? min_stock : product.min_stock;

  await product.save();
  return product;
};

// 4. Hapus item stok
exports.deleteProduct = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) {
    const err = new Error("Produk atau item inventaris tidak ditemukan");
    err.status = 404;
    throw err;
  }

  await product.destroy();
  return { message: "Item inventaris berhasil dihapus" };
};

// 5. Input Barang Masuk / Kulakan (Menambah stok fisik + catat modal HPP)
exports.createProcurement = async (payload) => {
  const { product_id, qty, total_cost } = payload;

  if (!product_id || !qty || !total_cost) {
    const err = new Error("Product ID, quantity, dan total cost wajib diisi");
    err.status = 400;
    throw err;
  }

  const t = await sequelize.transaction();

  try {
    const product = await Product.findByPk(product_id, { transaction: t });
    if (!product) {
      throw new Error("Produk yang dipilih tidak ditemukan");
    }

    // Tambah stok fisik produk
    product.stock += parseInt(qty, 10);
    await product.save({ transaction: t });

    // Catat riwayat kulakan
    const procurement = await Procurement.create({
      product_id,
      qty,
      total_cost,
    }, { transaction: t });

    await t.commit();
    return {
      message: "Kulakan berhasil dicatat dan stok bertambah",
      procurement,
      updated_stock: product.stock,
    };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};