const matchService = require("../services/matchService");

exports.getAllMatches = async (req, res, next) => {
  try {
    const data = await matchService.findAll();
    res.json({ success: true, message: "Daftar pertandingan berhasil diambil", data });
  } catch (error) { next(error); }
};

exports.getMatchById = async (req, res, next) => {
  try {
    const data = await matchService.findById(req.params.id);
    res.json({ success: true, message: "Detail pertandingan berhasil diambil", data });
  } catch (error) { next(error); }
};

exports.createMatch = async (req, res, next) => {
  try {
    const data = await matchService.create(req.body);
    res.status(201).json({ success: true, message: "Pertandingan berhasil dibuat", data });
  } catch (error) { next(error); }
};

exports.updateMatch = async (req, res, next) => {
  try {
    const data = await matchService.update(req.params.id, req.body);
    res.json({ success: true, message: "Pertandingan berhasil diperbarui", data });
  } catch (error) { next(error); }
};

exports.deleteMatch = async (req, res, next) => {
  try {
    await matchService.delete(req.params.id);
    res.json({ success: true, message: "Pertandingan berhasil dihapus" });
  } catch (error) { next(error); }
};