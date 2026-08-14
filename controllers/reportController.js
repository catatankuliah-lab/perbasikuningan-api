// services/reportService.js
const { Transaction, TransactionItems, Product, EmployeeCommission, Expense, Procurement, sequelize } = require("../models");
const { Op } = require("sequelize");

// Helper untuk membuat rentang tanggal query
const getDateRangeFilter = (query) => {
  const { start_date, end_date } = query;
  let whereClause = {};

  if (start_date && end_date) {
    whereClause.created_at = {
      [Op.between]: [`${start_date} 00:00:00`, `${end_date} 23:59:59`],
    };
  } else if (start_date) {
    whereClause.created_at = {
      [Op.gte]: `${start_date} 00:00:00`,
    };
  }
  return whereClause;
};

// 1. GET /api/reports/omzet (Rekap Omzet Kotor Harian/Bulanan)
exports.getOmzetReport = async (query) => {
  const dateFilter = getDateRangeFilter(query);

  const totalOmzet = await Transaction.sum("total_amount", {
    where: dateFilter,
  }) || 0;

  // Rincian per hari atau per transaksi jika dibutuhkan
  const transactions = await Transaction.findAll({
    where: dateFilter,
    attributes: ["id", "invoice_number", "total_amount", "payment_method", "cashier_name", "created_at"],
    order: [["created_at", "DESC"]],
  });

  return {
    total_omzet: parseFloat(totalOmzet),
    total_transactions: transactions.length,
    transactions,
  };
};

// 2. GET /api/reports/net-profit (Laba Bersih Otomatis: Omzet - HPP - Komisi - Expense)
exports.getNetProfitReport = async (query) => {
  const dateFilter = getDateRangeFilter(query);
  const dateFilterProcurement = {}; // Untuk HPP kulakan berdasarkan tanggal procurement

  if (query.start_date && query.end_date) {
    dateFilterProcurement.created_at = {
      [Op.between]: [`${query.start_date} 00:00:00`, `${query.end_date} 23:59:59`],
    };
  } else if (query.start_date) {
    dateFilterProcurement.created_at = {
      [Op.gte]: `${query.start_date} 00:00:00`,
    };
  }

  // A. Total Omzet
  const totalOmzet = await Transaction.sum("total_amount", { where: dateFilter }) || 0;

  // B. Total Modal / HPP (Dari total cost procurements dalam rentang waktu tersebut)
  const totalHpp = await Procurement.sum("total_cost", { where: dateFilterProcurement }) || 0;

  // C. Total Komisi Karyawan
  const totalCommission = await EmployeeCommission.sum("amount", { where: dateFilter }) || 0;

  // D. Total Pengeluaran Operasional (Expenses)
  const totalExpense = await Expense.sum("amount", { where: dateFilter }) || 0;

  // Hitung Laba Bersih
  const netProfit = parseFloat(totalOmzet) - parseFloat(totalHpp) - parseFloat(totalCommission) - parseFloat(totalExpense);

  return {
    omzet: parseFloat(totalOmzet),
    hpp_modal: parseFloat(totalHpp),
    komisi_karyawan: parseFloat(totalCommission),
    operational_expenses: parseFloat(totalExpense),
    net_profit: netProfit,
  };
};

// 3. GET /api/reports/best-sellers (Statistik Produk/Layanan Terlaris)
exports.getBestSellersReport = async (query) => {
  const dateFilter = getDateRangeFilter(query);

  // Ambil item transaksi dengan filter tanggal pada header transaksi
  const items = await TransactionItems.findAll({
    include: [
      {
        model: Transaction,
        as: "transaction",
        where: dateFilter,
        attributes: [],
      },
      {
        model: Product,
        as: "product",
        attributes: ["id", "name", "category", "price"],
      },
    ],
    attributes: [
      "product_id",
      [sequelize.fn("SUM", sequelize.col("TransactionItems.quantity")), "total_sold"],
      [sequelize.fn("SUM", sequelize.col("TransactionItems.subtotal")), "total_revenue"],
    ],
    group: ["product_id", "product.id", "product.name", "product.category", "product.price"],
    order: [[sequelize.literal("total_sold"), "DESC"]],
  });

  return items;
};

// 4. GET /api/reports/cash-recap (Rekap Uang Kas Masuk: Tunai vs Digital)
exports.getCashRecapReport = async (query) => {
  try {
    const data = await ReportService.getCashRecapReport(req.query);
    res.json({ success: true, message: "Rekap kas masuk berhasil diambil", data });
  } catch (error) {
    next(error);
  }
};