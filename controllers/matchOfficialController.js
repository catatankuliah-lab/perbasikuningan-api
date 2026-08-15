const matchOfficialService = require("../services/matchOfficialService");

exports.getAllAssignments = async (req, res, next) => {
  try {
    const data = await matchOfficialService.findAll();
    res.json({ success: true, message: "Daftar penugasan official berhasil diambil", data });
  } catch (error) { next(error); }
};

exports.assignOfficial = async (req, res, next) => {
  try {
    const data = await matchOfficialService.create(req.body);
    res.status(201).json({ success: true, message: "Official berhasil ditugaskan", data });
  } catch (error) { next(error); }
};

exports.removeAssignment = async (req, res, next) => {
  try {
    await matchOfficialService.delete(req.params.id);
    res.json({ success: true, message: "Penugasan official berhasil dihapus" });
  } catch (error) { next(error); }
};