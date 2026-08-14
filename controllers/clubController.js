const clubService = require("../services/clubService");

exports.getAllClubs = async (req, res, next) => {
  try {
    const data = await clubService.findAll();
    res.json({ success: true, data });
  } catch (error) { next(error); }
};

exports.getClubById = async (req, res, next) => {
  try {
    const data = await clubService.findById(req.params.id);
    res.json({ success: true, data });
  } catch (error) { next(error); }
};

exports.createClub = async (req, res, next) => {
  try {
    const data = await clubService.create(req.body);
    res.status(201).json({ success: true, message: "Club berhasil dibuat", data });
  } catch (error) { next(error); }
};

exports.updateClub = async (req, res, next) => {
  try {
    const data = await clubService.update(req.params.id, req.body);
    res.json({ success: true, message: "Club berhasil diupdate", data });
  } catch (error) { next(error); }
};

exports.deleteClub = async (req, res, next) => {
  try {
    await clubService.delete(req.params.id);
    res.json({ success: true, message: "Club berhasil dihapus" });
  } catch (error) { next(error); }
};