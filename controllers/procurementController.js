// controllers/procurementController.js
const ProcurementService = require("../services/procurementService");

exports.getProcurements = async (req, res, next) => {
  try {
    const result = await ProcurementService.getAllOrSearchProcurements(req.query);
    res.json({
      success: true,
      message: "Data barang masuk berhasil diambil",
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

exports.getProcurementById = async (req, res, next) => {
  try {
    const data = await ProcurementService.getProcurementById(req.params.id);
    res.json({
      success: true,
      message: "Detail barang masuk berhasil diambil",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.createProcurement = async (req, res, next) => {
  try {
    const data = await ProcurementService.createProcurement(req.body);
    res.status(201).json({
      success: true,
      message: "Data barang masuk berhasil disimpan dan stok diperbarui",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteProcurement = async (req, res, next) => {
  try {
    const result = await ProcurementService.deleteProcurement(req.params.id);
    res.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};