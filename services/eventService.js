const { Event, User } = require("../models");

exports.findAll = async () => {
  return await Event.findAll({
    include: [
      {
        model: User,
        as: "organizer",
        attributes: ["id", "full_name", "email"],
      },
    ],
    order: [["start_date", "ASC"]],
  });
};

exports.findById = async (id) => {
  const event = await Event.findByPk(id, {
    include: [
      {
        model: User,
        as: "organizer",
        attributes: ["id", "full_name", "email"],
      },
    ],
  });
  
  if (!event) {
    const error = new Error("Event tidak ditemukan");
    error.status = 404;
    throw error;
  }
  
  return event;
};

exports.create = async (data) => {
  return await Event.create(data);
};

exports.update = async (id, data) => {
  const event = await Event.findByPk(id);
  if (!event) {
    const error = new Error("Event tidak ditemukan");
    error.status = 404;
    throw error;
  }
  return await event.update(data);
};

exports.delete = async (id) => {
  const event = await Event.findByPk(id);
  if (!event) {
    const error = new Error("Event tidak ditemukan");
    error.status = 404;
    throw error;
  }
  return await event.destroy();
};