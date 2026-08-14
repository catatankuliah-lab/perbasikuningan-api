const { Official } = require("../models");

exports.findAll = async () => {
  return await Official.findAll({
    order: [["name", "ASC"]]
  });
};

exports.findById = async (id) => {
  const official = await Official.findByPk(id);
  if (!official) {
    const error = new Error("Official tidak ditemukan");
    error.status = 404;
    throw error;
  }
  return official;
};

exports.create = async (data) => {
  return await Official.create(data);
};

exports.update = async (id, data) => {
  const official = await Official.findByPk(id);
  if (!official) {
    const error = new Error("Official tidak ditemukan");
    error.status = 404;
    throw error;
  }
  return await official.update(data);
};

exports.delete = async (id) => {
  const official = await Official.findByPk(id);
  if (!official) {
    const error = new Error("Official tidak ditemukan");
    error.status = 404;
    throw error;
  }
  return await official.destroy();
};