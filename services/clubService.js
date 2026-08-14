// services/clubService.js
const { Club, User } = require("../models");

/**
 * Mengambil semua data klub beserta informasi managernya
 */
exports.findAll = async () => {
  return await Club.findAll({
    include: [
      {
        model: User,
        as: "manager",
        attributes: ["id", "full_name", "email"], // Hanya ambil field yang diperlukan
      },
    ],
    order: [["club_name", "ASC"]], // Urutkan berdasarkan nama klub secara alfabetis
  });
};

/**
 * Mencari satu klub berdasarkan ID
 * @param {string} id - UUID Klub
 */
exports.findById = async (id) => {
  const club = await Club.findByPk(id, {
    include: [
      {
        model: User,
        as: "manager",
        attributes: ["id", "full_name", "email"],
      },
    ],
  });
  
  if (!club) {
    const error = new Error("Klub tidak ditemukan");
    error.status = 404;
    throw error;
  }
  
  return club;
};

/**
 * Membuat klub baru
 * @param {object} data - Payload data klub (termasuk logo_club path)
 */
exports.create = async (data) => {
  return await Club.create(data);
};

/**
 * Memperbarui data klub
 * @param {string} id - UUID Klub
 * @param {object} data - Data yang akan diupdate
 */
exports.update = async (id, data) => {
  const club = await Club.findByPk(id);
  
  if (!club) {
    const error = new Error("Klub tidak ditemukan");
    error.status = 404;
    throw error;
  }

  // Update data ke database
  return await club.update(data);
};

/**
 * Menghapus klub dari database
 * @param {string} id - UUID Klub
 */
exports.delete = async (id) => {
  const club = await Club.findByPk(id);
  
  if (!club) {
    const error = new Error("Klub tidak ditemukan");
    error.status = 404;
    throw error;
  }

  return await club.destroy();
};