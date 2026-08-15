const { MatchOfficial, Match, Official, Club } = require("../models");

exports.findAll = async () => {
  return await MatchOfficial.findAll({
    include: [
      { 
        model: Match, 
        as: "match",
        include: [
            { model: Club, as: "team_a", attributes: ["club_name"] },
            { model: Club, as: "team_b", attributes: ["club_name"] }
        ]
      },
      { model: Official, as: "official", attributes: ["id", "name", "type"] }
    ],
    order: [["created_at", "DESC"]]
  });
};

exports.create = async (data) => {
  // Validasi: Cek apakah official sudah ditugaskan di match yang sama
  const existing = await MatchOfficial.findOne({
    where: { match_id: data.match_id, official_id: data.official_id }
  });

  if (existing) {
    const error = new Error("Official ini sudah ditugaskan pada pertandingan tersebut");
    error.status = 400;
    throw error;
  }

  return await MatchOfficial.create(data);
};

exports.delete = async (id) => {
  const assignment = await MatchOfficial.findByPk(id);
  if (!assignment) {
    const error = new Error("Penugasan tidak ditemukan");
    error.status = 404;
    throw error;
  }
  return await assignment.destroy();
};