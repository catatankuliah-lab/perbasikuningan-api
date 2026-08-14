const TransactionService = require("../services/transactionService");

exports.createTransaction = async (req, res, next) => {
  try {
    const cashierName = req.user ? req.user.username : "Kasir";
    const data = await TransactionService.createTransaction(req.body, cashierName);
    res.status(201).json({
      success: true,
      message: "Transaksi berhasil dibuat dan stok diperbarui",
      data,
    });
  } catch (error) {
    next(error);
  }
};
exports.getTransactions = async (req, res, next) => {
    try {
      const data = await TransactionService.getAllTransactions(req.query);
      res.json({ success: true, message: "Riwayat transaksi berhasil diambil", data });
    } catch (error) {
      next(error);
    }
  };

exports.getTransactionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await TransactionService.getTransactionById(id);
    res.json({ success: true, message: "Detail transaksi berhasil diambil", data });
  } catch (error) {
    next(error);
  }
};