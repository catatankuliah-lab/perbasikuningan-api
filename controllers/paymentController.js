// controllers/paymentController.js
const paymentService = require("../services/paymentService");

exports.getAllPayments = async (req, res, next) => {
  try {
    const data = await paymentService.findAll();
    res.json({ 
      success: true, 
      message: "Daftar pembayaran berhasil diambil", 
      data 
    });
  } catch (error) { 
    next(error); 
  }
};

exports.getPaymentById = async (req, res, next) => {
  try {
    const data = await paymentService.findById(req.params.id);
    res.json({ 
      success: true, 
      message: "Detail pembayaran berhasil diambil", 
      data 
    });
  } catch (error) { 
    next(error); 
  }
};

exports.createPayment = async (req, res, next) => {
  try {
    const data = await paymentService.create(req.body);
    res.status(201).json({ 
      success: true, 
      message: "Pembayaran berhasil dicatat", 
      data 
    });
  } catch (error) { 
    next(error); 
  }
};

exports.updatePayment = async (req, res, next) => {
  try {
    // Jika user yang update adalah approver, kita bisa otomatis set approver_id dari req.user.id
    const payload = { ...req.body };
    if (req.user && req.user.id) {
        payload.approver_id = req.user.id;
    }

    const data = await paymentService.update(req.params.id, payload);
    res.json({ 
      success: true, 
      message: "Pembayaran berhasil diperbarui", 
      data 
    });
  } catch (error) { 
    next(error); 
  }
};

exports.deletePayment = async (req, res, next) => {
  try {
    await paymentService.delete(req.params.id);
    res.json({ 
      success: true, 
      message: "Pembayaran berhasil dihapus" 
    });
  } catch (error) { 
    next(error); 
  }
};