const { Player, Club } = require("../models");

exports.findAll = async () => {
  return await Player.findAll({
    include: [{ model: Club, as: "club", attributes: ["id", "club_name"] }],
    order: [["name", "ASC"]]
  });
};

exports.findById = async (id) => {
  const player = await Player.findByPk(id, {
    include: [{ model: Club, as: "club", attributes: ["id", "club_name"] }]
  });
  if (!player) throw new Error("Player tidak ditemukan");
  return player;
};

exports.create = async (data) => {
  return await Player.create(data);
};

exports.update = async (id, data) => {
  const player = await Player.findByPk(id);
  if (!player) throw new Error("Player tidak ditemukan");
  return await player.update(data);
};

exports.delete = async (id) => {
  const player = await Player.findByPk(id);
  if (!player) throw new Error("Player tidak ditemukan");
  return await player.destroy();
};