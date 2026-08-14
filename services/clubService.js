const { Club, User } = require("../models");

exports.findAll = async () => {
  return await Club.findAll({ 
    include: [{ 
      model: User, 
      as: "manager", 
      attributes: ["id", "full_name", "email"] 
    }] 
  });
};

exports.findById = async (id) => {
  const club = await Club.findByPk(id, {
    include: [{ 
      model: User, 
      as: "manager", 
      attributes: ["id", "full_name", "email"] 
    }]
  });
  if (!club) throw new Error("Club tidak ditemukan");
  return club;
};

exports.create = async (data) => {
  return await Club.create(data);
};

exports.update = async (id, data) => {
  const club = await Club.findByPk(id);
  if (!club) throw new Error("Club tidak ditemukan");
  return await club.update(data);
};

exports.delete = async (id) => {
  const club = await Club.findByPk(id);
  if (!club) throw new Error("Club tidak ditemukan");
  return await club.destroy();
};