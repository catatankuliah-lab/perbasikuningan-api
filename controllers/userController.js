const userService = require("../services/userService");

exports.getAllUsers = async (req, res, next) => {
  try {
    const data = await userService.findAll();
    res.json({ success: true, data });
  } catch (error) { next(error); }
};

exports.getUserById = async (req, res, next) => {
  try {
    const data = await userService.findById(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: "User tidak ditemukan" });
    res.json({ success: true, data });
  } catch (error) { next(error); }
};

exports.createUser = async (req, res, next) => {
  try {
    const data = await userService.create(req.body);
    res.status(201).json({ success: true, message: "User berhasil dibuat", data });
  } catch (error) { next(error); }
};

exports.updateUser = async (req, res, next) => {
  try {
    const data = await userService.update(req.params.id, req.body);
    res.json({ success: true, message: "User berhasil diupdate", data });
  } catch (error) { next(error); }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await userService.delete(req.params.id);
    res.json({ success: true, message: "User berhasil dihapus" });
  } catch (error) { next(error); }
};