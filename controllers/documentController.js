const documentService = require("../services/documentService");
const fs = require("fs");
const path = require("path");

exports.getAllDocuments = async (req, res, next) => {
  try {
    const data = await documentService.findAll();
    res.json({ success: true, data });
  } catch (error) { next(error); }
};

exports.getDocumentById = async (req, res, next) => {
  try {
    const data = await documentService.findById(req.params.id);
    res.json({ success: true, data });
  } catch (error) { next(error); }
};

exports.createDocument = async (req, res, next) => {
  try {
    const payload = { 
        ...req.body,
        created_by: req.user.id // Diambil dari token JWT saat login
    };

    if (req.file) {
      payload.file_url = req.file.path.replace(/\\/g, "/");
    } else {
      return res.status(400).json({ success: false, message: "File dokumen wajib diunggah" });
    }

    const data = await documentService.create(payload);
    res.status(201).json({ success: true, message: "Dokumen berhasil diunggah", data });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    next(error);
  }
};

exports.updateDocument = async (req, res, next) => {
  try {
    const doc = await documentService.findById(req.params.id);
    const payload = { ...req.body };

    if (req.file) {
      if (doc.file_url && fs.existsSync(doc.file_url)) fs.unlinkSync(doc.file_url);
      payload.file_url = req.file.path.replace(/\\/g, "/");
    }

    const data = await documentService.update(req.params.id, payload);
    res.json({ success: true, message: "Dokumen berhasil diperbarui", data });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    next(error);
  }
};

exports.deleteDocument = async (req, res, next) => {
  try {
    const doc = await documentService.findById(req.params.id);
    if (doc.file_url && fs.existsSync(doc.file_url)) fs.unlinkSync(doc.file_url);
    
    await documentService.delete(req.params.id);
    res.json({ success: true, message: "Dokumen berhasil dihapus" });
  } catch (error) { next(error); }
};