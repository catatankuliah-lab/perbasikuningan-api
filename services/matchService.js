const { Match, Event, Club } = require("../models");

exports.findAll = async () => {
  return await Match.findAll({
    include: [
      { model: Event, as: "event", attributes: ["id", "title"] },
      { model: Club, as: "team_a", attributes: ["id", "club_name", "logo_club"] },
      { model: Club, as: "team_b", attributes: ["id", "club_name", "logo_club"] }
    ],
    order: [["match_date", "ASC"]]
  });
};

exports.findById = async (id) => {
  const match = await Match.findByPk(id, {
    include: [
      { model: Event, as: "event", attributes: ["id", "title"] },
      { model: Club, as: "team_a", attributes: ["id", "club_name", "logo_club"] },
      { model: Club, as: "team_b", attributes: ["id", "club_name", "logo_club"] }
    ]
  });
  if (!match) {
    const error = new Error("Pertandingan tidak ditemukan");
    error.status = 404;
    throw error;
  }
  return match;
};

exports.create = async (data) => {
  return await Match.create(data);
};

exports.update = async (id, data) => {
  const match = await Match.findByPk(id);
  if (!match) {
    const error = new Error("Pertandingan tidak ditemukan");
    error.status = 404;
    throw error;
  }
  return await match.update(data);
};

exports.delete = async (id) => {
  const match = await Match.findByPk(id);
  if (!match) {
    const error = new Error("Pertandingan tidak ditemukan");
    error.status = 404;
    throw error;
  }
  return await match.destroy();
};