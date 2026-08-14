// controllers/commissionRuleController.js
const CommissionRuleService = require("../services/commissionRuleService");

exports.getRules = async (req, res, next) => {
  try {
    const { page, limit, search, is_active } = req.query;

    const result = await CommissionRuleService.getAllRules({
      page,
      limit,
      search,
      is_active,
    });

    if (result.pagination) {
      return res.json({
        success: true,
        message: "Daftar aturan komisi berhasil diambil",
        data: result.data,
        pagination: result.pagination,
      });
    }

    res.json({ success: true, message: "Daftar aturan komisi berhasil diambil", data: result });
  } catch (error) {
    next(error);
  }
};

exports.getRuleById = async (req, res, next) => {
  try {
    const data = await CommissionRuleService.getRuleById(req.params.id);
    res.json({ success: true, message: "Detail aturan komisi berhasil diambil", data });
  } catch (error) {
    next(error);
  }
};

exports.createRule = async (req, res, next) => {
  try {
    const data = await CommissionRuleService.createRule(req.body);
    res.status(201).json({ success: true, message: "Aturan komisi berhasil ditambahkan", data });
  } catch (error) {
    next(error);
  }
};

exports.updateRule = async (req, res, next) => {
  try {
    const data = await CommissionRuleService.updateRule(req.params.id, req.body);
    res.json({ success: true, message: "Aturan komisi berhasil diperbarui", data });
  } catch (error) {
    next(error);
  }
};

exports.deleteRule = async (req, res, next) => {
  try {
    const data = await CommissionRuleService.deleteRule(req.params.id);
    res.json({ success: true, message: data.message });
  } catch (error) {
    next(error);
  }
};