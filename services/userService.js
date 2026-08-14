const { User } = require("../models");
const bcrypt = require("bcryptjs");

exports.findAll = async () => {
  return await User.findAll({ attributes: { exclude: ['password_hash'] } });
};

exports.findById = async (id) => {
  return await User.findByPk(id, { attributes: { exclude: ['password_hash'] } });
};

exports.create = async (data) => {
  // Password akan di-hash oleh hook di model
  return await User.create(data);
};

exports.update = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("User tidak ditemukan");
  
  // Jika password diupdate, hook beforeUpdate di model akan menghash-nya
  return await user.update(data);
};

exports.delete = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("User tidak ditemukan");
  return await user.destroy();
};