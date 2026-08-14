const playerService = require("../services/playerService");
const fs = require("fs");

// Helper untuk menghapus file
const deleteFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    try { fs.unlinkSync(filePath); } catch (err) { console.error(err); }
  }
};

exports.getAllPlayers = async (req, res, next) => {
  try {
    const data = await playerService.findAll();
    res.json({ success: true, data });
  } catch (error) { next(error); }
};

exports.getPlayerById = async (req, res, next) => {
  try {
    const data = await playerService.findById(req.params.id);
    res.json({ success: true, data });
  } catch (error) { next(error); }
};

exports.createPlayer = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    
    // Handle multiple files
    if (req.files) {
      if (req.files['identity_photo']) payload.identity_photo = req.files['identity_photo'][0].path.replace(/\\/g, "/");
      if (req.files['ktp_file']) payload.ktp_file = req.files['ktp_file'][0].path.replace(/\\/g, "/");
    }

    const data = await playerService.create(payload);
    res.status(201).json({ success: true, message: "Player berhasil dibuat", data });
  } catch (error) {
    if (req.files) {
      if (req.files['identity_photo']) deleteFile(req.files['identity_photo'][0].path);
      if (req.files['ktp_file']) deleteFile(req.files['ktp_file'][0].path);
    }
    next(error);
  }
};

exports.updatePlayer = async (req, res, next) => {
  try {
    const player = await playerService.findById(req.params.id);
    const payload = { ...req.body };

    if (req.files) {
      if (req.files['identity_photo']) {
        deleteFile(player.identity_photo);
        payload.identity_photo = req.files['identity_photo'][0].path.replace(/\\/g, "/");
      }
      if (req.files['ktp_file']) {
        deleteFile(player.ktp_file);
        payload.ktp_file = req.files['ktp_file'][0].path.replace(/\\/g, "/");
      }
    }

    const data = await playerService.update(req.params.id, payload);
    res.json({ success: true, message: "Player berhasil diupdate", data });
  } catch (error) {
    if (req.files) {
      if (req.files['identity_photo']) deleteFile(req.files['identity_photo'][0].path);
      if (req.files['ktp_file']) deleteFile(req.files['ktp_file'][0].path);
    }
    next(error);
  }
};

exports.deletePlayer = async (req, res, next) => {
  try {
    const player = await playerService.findById(req.params.id);
    deleteFile(player.identity_photo);
    deleteFile(player.ktp_file);
    await playerService.delete(req.params.id);
    res.json({ success: true, message: "Player berhasil dihapus" });
  } catch (error) { next(error); }
};