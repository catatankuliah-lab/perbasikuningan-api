const { Document, User, Event } = require("../models");

exports.findAll = async () => {
  return await Document.findAll({
    include: [
      { model: User, as: "creator", attributes: ["id", "full_name"] },
      { model: Event, as: "event", attributes: ["id", "title"] }
    ],
    order: [["created_at", "DESC"]]
  });
};

exports.findById = async (id) => {
  const doc = await Document.findByPk(id, {
    include: [
      { model: User, as: "creator", attributes: ["id", "full_name"] },
      { model: Event, as: "event", attributes: ["id", "title"] }
    ]
  });
  if (!doc) throw new Error("Dokumen tidak ditemukan");
  return doc;
};

exports.create = async (data) => {
  return await Document.create(data);
};

exports.update = async (id, data) => {
  const doc = await Document.findByPk(id);
  if (!doc) throw new Error("Dokumen tidak ditemukan");
  return await doc.update(data);
};

exports.delete = async (id) => {
  const doc = await Document.findByPk(id);
  if (!doc) throw new Error("Dokumen tidak ditemukan");
  return await doc.destroy();
};