const { EventParticipation, Event, Club } = require("../models");

exports.findAll = async () => {
  return await EventParticipation.findAll({
    include: [
      { model: Event, as: "event", attributes: ["id", "title"] },
      { model: Club, as: "club", attributes: ["id", "club_name", "logo_club"] }
    ],
    order: [["created_at", "DESC"]]
  });
};

exports.findById = async (id) => {
  const participation = await EventParticipation.findByPk(id, {
    include: [
      { model: Event, as: "event", attributes: ["id", "title"] },
      { model: Club, as: "club", attributes: ["id", "club_name", "logo_club"] }
    ]
  });
  if (!participation) {
    const error = new Error("Data partisipasi tidak ditemukan");
    error.status = 404;
    throw error;
  }
  return participation;
};

exports.create = async (data) => {
  // Cek apakah klub sudah terdaftar di event yang sama (cegah duplikat)
  const existing = await EventParticipation.findOne({
    where: { event_id: data.event_id, club_id: data.club_id }
  });
  
  if (existing) {
    const error = new Error("Klub ini sudah terdaftar dalam event tersebut");
    error.status = 400;
    throw error;
  }

  return await EventParticipation.create(data);
};

exports.delete = async (id) => {
  const participation = await EventParticipation.findByPk(id);
  if (!participation) {
    const error = new Error("Data partisipasi tidak ditemukan");
    error.status = 404;
    throw error;
  }
  return await participation.destroy();
};