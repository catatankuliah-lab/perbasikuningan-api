// services/commissionRuleService.js
const { CommissionRule, Product } = require("../models");
const { Op } = require("sequelize");

exports.getAllRules = async (query = {}) => {
  const { page, limit, search, is_active } = query;

  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 10;
  const offset = (pageNum - 1) * limitNum;

  const whereClause = {};

  // Perbaikan pencarian agar mencakup service_name atau nama dari tabel Product lewat relasi
  if (search) {
    whereClause[Op.or] = [
      { service_name: { [Op.like]: `%${search}%` } },
      { "$product.name$": { [Op.like]: `%${search}%` } },
    ];
  }

  if (is_active !== undefined && is_active !== "") {
    whereClause.is_active = is_active === "1" || is_active === true;
  }

  const { count, rows } = await CommissionRule.findAndCountAll({
    where: whereClause,
    include: [
      {
        model: Product,
        as: "product",
        attributes: ["id", "name", "category", "price"],
      },
    ],
    limit: limitNum,
    offset: offset,
    order: [["created_at", "DESC"]],
    distinct: true, // Wajib ada distinct agar count pagination akurat saat pakai include JOIN
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

exports.getRuleById = async (id) => {
  const rule = await CommissionRule.findByPk(id, {
    include: [{ model: Product, as: "product", attributes: ["id", "name", "category", "price"] }],
  });
  if (!rule) {
    const err = new Error("Aturan komisi tidak ditemukan");
    err.status = 404;
    throw err;
  }
  return rule;
};

exports.createRule = async (payload) => {
  const { product_id, service_name, commission_price, is_active } = payload;
  
  if (product_id) {
    const existing = await CommissionRule.findOne({ where: { product_id } });
    if (existing) {
      const err = new Error(`Aturan komisi untuk layanan ini sudah ada`);
      err.status = 400;
      throw err;
    }
  }

  return await CommissionRule.create({
    product_id: product_id || null,
    service_name,
    commission_price: commission_price || 0.00,
    is_active: is_active !== undefined ? is_active : true,
  });
};

exports.updateRule = async (id, payload) => {
  const rule = await exports.getRuleById(id);
  const { product_id, service_name, commission_price, is_active } = payload;

  rule.product_id = product_id !== undefined ? product_id : rule.product_id;
  rule.service_name = service_name !== undefined ? service_name : rule.service_name;
  rule.commission_price = commission_price !== undefined ? commission_price : rule.commission_price;
  rule.is_active = is_active !== undefined ? is_active : rule.is_active;

  await rule.save();
  return rule;
};

exports.deleteRule = async (id) => {
  const rule = await exports.getRuleById(id);
  await rule.destroy();
  return { message: "Aturan komisi berhasil dihapus" };
};