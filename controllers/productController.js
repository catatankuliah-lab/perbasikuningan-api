// controllers/productController.js
const ProductService = require("../services/productService");

exports.getProducts = async (req, res, next) => {
  try {
    const { page, limit, search, category, is_active } = req.query;

    // Panggil service dengan melemparkan objek query filter
    const result = await ProductService.getAllProducts({
      page,
      limit,
      search,
      category,
      is_active,
    });

    // Jika service mengembalikan hasil dengan pagination
    if (result.pagination) {
      return res.json({
        success: true,
        message: "Daftar produk berhasil diambil",
        data: result.data,
        pagination: result.pagination,
      });
    }

    // Fallback jika data mentah
    res.json({ success: true, message: "Daftar produk berhasil diambil", data: result });
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const data = await ProductService.getProductById(req.params.id);
    res.json({ success: true, message: "Detail produk berhasil diambil", data });
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const data = await ProductService.createProduct(req.body);
    res.status(201).json({ success: true, message: "Produk berhasil ditambahkan", data });
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const data = await ProductService.updateProduct(req.params.id, req.body);
    res.json({ success: true, message: "Produk berhasil diperbarui", data });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const data = await ProductService.deleteProduct(req.params.id);
    res.json({ success: true, message: data.message });
  } catch (error) {
    next(error);
  }
};