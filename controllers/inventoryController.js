// controllers/inventoryController.js
const InventoryService = require("../services/inventoryService");

exports.getInventory = async (req, res, next) => {
  try {
    const data = await InventoryService.getAllInventory();
    res.json({ success: true, message: "Daftar inventaris berhasil diambil", data });
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const data = await InventoryService.createProduct(req.body);
    res.status(201).json({ success: true, message: "Item inventaris berhasil ditambahkan", data });
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const data = await InventoryService.updateProduct(req.params.id, req.body);
    res.json({ success: true, message: "Item inventaris berhasil diperbarui", data });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const data = await InventoryService.deleteProduct(req.params.id);
    res.json({ success: true, message: data.message });
  } catch (error) {
    next(error);
  }
};

exports.createProcurement = async (req, res, next) => {
  try {
    const data = await InventoryService.createProcurement(req.body);
    res.status(201).json({ success: true, message: data.message, data });
  } catch (error) {
    next(error);
  }
};