// controllers/customerController.js
const CustomerService = require("../services/customerService");

exports.getCustomers = async (req, res, next) => {
  try {
    const result = await CustomerService.getAllOrSearchCustomer(req.query);
    res.json({
      success: true,
      message: "Data pelanggan berhasil diambil",
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCustomerDetailWithHistory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await CustomerService.getCustomerHistory(id); // Fungsi ini sudah mencakup data pelanggan + transaksi
    res.json({
      success: true,
      message: "Detail dan riwayat pelanggan berhasil diambil",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.createCustomer = async (req, res, next) => {
  try {
    const data = await CustomerService.createCustomer(req.body);
    res.status(201).json({
      success: true,
      message: "Pelanggan berhasil disimpan",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCustomer = async (req, res, next) => {
  try {
    const data = await CustomerService.updateCustomer(req.params.id, req.body);
    res.json({
      success: true,
      message: "Pelanggan berhasil diperbarui",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCustomer = async (req, res, next) => {
  try {
    const data = await CustomerService.deleteCustomer(req.params.id);
    res.json({
      success: true,
      message: data.message,
    });
  } catch (error) {
    next(error);
  }
};