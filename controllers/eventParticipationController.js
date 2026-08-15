const eventParticipationService = require("../services/eventParticipationService");

exports.getAllParticipations = async (req, res, next) => {
  try {
    const data = await eventParticipationService.findAll();
    res.json({ success: true, message: "Daftar partisipasi event berhasil diambil", data });
  } catch (error) { next(error); }
};

exports.getParticipationById = async (req, res, next) => {
  try {
    const data = await eventParticipationService.findById(req.params.id);
    res.json({ success: true, data });
  } catch (error) { next(error); }
};

exports.createParticipation = async (req, res, next) => {
  try {
    const data = await eventParticipationService.create(req.body);
    res.status(201).json({ success: true, message: "Klub berhasil didaftarkan ke event", data });
  } catch (error) { next(error); }
};

exports.deleteParticipation = async (req, res, next) => {
  try {
    await eventParticipationService.delete(req.params.id);
    res.json({ success: true, message: "Partisipasi event berhasil dihapus" });
  } catch (error) { next(error); }
};