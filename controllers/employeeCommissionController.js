// controllers/employeeCommissionController.js
const EmployeeCommissionService = require("../services/employeeCommissionService");

exports.getSummary = async (req, res, next) => {
  try {
    const data = await EmployeeCommissionService.getCommissionSummary();
    res.json({ success: true, message: "Rekap komisi berhasil diambil", data });
  } catch (error) {
    next(error);
  }
};

exports.payCommission = async (req, res, next) => {
  try {
    const data = await EmployeeCommissionService.payEmployeeCommission(req.body);
    res.json({ success: true, message: data.message, data });
  } catch (error) {
    next(error);
  }
};