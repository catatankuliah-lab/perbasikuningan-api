// services/employeeCommissionService.js
const { EmployeeCommission, Employee, Transaction, sequelize } = require("../models");
const { Op } = require("sequelize");

// 1. Ambil Rekap Total Komisi Belum Dibayar per Karyawan (/api/commissions/summary)
exports.getCommissionSummary = async () => {
  // Ambil semua data komisi yang statusnya belum dibayar (is_paid = false)
  const unpaidCommissions = await EmployeeCommission.findAll({
    where: { is_paid: false },
    include: [
      {
        model: Employee,
        as: "employee",
        attributes: ["id", "name", "phone"],
      },
      {
        model: Transaction,
        as: "transaction",
        attributes: ["id", "invoice_number", "created_at"],
      },
    ],
    order: [["created_at", "DESC"]],
  });

  // Agregasi / grouping total komisi per karyawan
  const summaryMap = {};

  unpaidCommissions.forEach((item) => {
    const empId = item.employee_id;
    if (!summaryMap[empId]) {
      summaryMap[empId] = {
        employee: item.employee,
        total_unpaid_amount: 0,
        total_transactions: 0,
        details: [],
      };
    }
    summaryMap[empId].total_unpaid_amount += parseFloat(item.amount);
    summaryMap[empId].total_transactions += 1;
    summaryMap[empId].details.push({
      commission_id: item.id,
      transaction_id: item.transaction_id,
      invoice_number: item.transaction ? item.transaction.invoice_number : null,
      amount: item.amount,
      date: item.created_at,
    });
  });

  return Object.values(summaryMap);
};

// 2. Tandai/Bayar Komisi Karyawan (/api/commissions/pay)
exports.payEmployeeCommission = async (payload) => {
  const { employee_id } = payload;

  if (!employee_id) {
    const err = new Error("Employee ID wajib diisi untuk pembayaran komisi");
    err.status = 400;
    throw err;
  }

  const t = await sequelize.transaction();

  try {
    // Cari semua komisi yang belum dibayar untuk karyawan tersebut
    const commissions = await EmployeeCommission.findAll({
      where: { employee_id, is_paid: false },
      transaction: t,
    });

    if (commissions.length === 0) {
      throw new Error("Tidak ada komisi tertunda (unpaid) untuk karyawan ini");
    }

    const now = new Date();
    let totalPaid = 0;

    for (const comm of commissions) {
      totalPaid += parseFloat(comm.amount);
      comm.is_paid = true;
      comm.paid_at = now;
      await comm.save({ transaction: t });
    }

    await t.commit();
    return {
      message: "Komisi berhasil dibayarkan dan di-reset",
      employee_id,
      total_paid_amount: totalPaid,
      paid_at: now,
    };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};