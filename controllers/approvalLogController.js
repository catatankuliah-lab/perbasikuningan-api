// controllers/approvalLogController.js
const approvalLogService = require("../services/approvalLogService");

exports.getAllLogs = async (req, res, next) => {
  try {
    const data = await approvalLogService.findAll();
    res.json({ success: true, data });
  } catch (error) { 
    next(error); 
  }
};

exports.getLogsByDocumentId = async (req, res, next) => {
  try {
    const data = await approvalLogService.findByDocumentId(req.params.document_id);
    res.json({ success: true, data });
  } catch (error) { 
    next(error); 
  }
};

exports.createLog = async (req, res, next) => {
  try {
    const payload = { 
      ...req.body,
      approver_id: req.user.id // Otomatis ambil dari user yang sedang login
    };

    const data = await approvalLogService.create(payload);
    res.status(201).json({ 
      success: true, 
      message: "Log persetujuan berhasil disimpan", 
      data 
    });
  } catch (error) { 
    next(error); 
  }
};