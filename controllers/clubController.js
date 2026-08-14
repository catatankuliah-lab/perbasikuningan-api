// controllers/clubController.js
const clubService = require("../services/clubService");
const fs = require("fs");
const path = require("path");

/**
 * Mendapatkan semua daftar klub
 */
exports.getAllClubs = async (req, res, next) => {
  try {
    const data = await clubService.findAll();
    res.json({ 
      success: true, 
      message: "Daftar klub berhasil diambil", 
      data 
    });
  } catch (error) { 
    next(error); 
  }
};

/**
 * Mendapatkan detail klub berdasarkan ID
 */
exports.getClubById = async (req, res, next) => {
  try {
    const data = await clubService.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ 
        success: false, 
        message: "Klub tidak ditemukan" 
      });
    }
    res.json({ 
      success: true, 
      message: "Detail klub berhasil diambil", 
      data 
    });
  } catch (error) { 
    next(error); 
  }
};

/**
 * Menambah klub baru (dengan upload logo)
 */
exports.createClub = async (req, res, next) => {
  try {
    const payload = { ...req.body };

    // Jika ada file yang diupload, simpan path-nya
    if (req.file) {
      // Mengubah backslash menjadi forward slash untuk URL compatibility
      payload.logo_club = req.file.path.replace(/\\/g, "/");
    }

    const data = await clubService.create(payload);
    res.status(201).json({ 
      success: true, 
      message: "Klub berhasil dibuat", 
      data 
    });
  } catch (error) { 
    // Jika gagal insert database tapi file sudah terlanjur upload, hapus filenya
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    next(error); 
  }
};

/**
 * Memperbarui data klub (dengan update logo)
 */
exports.updateClub = async (req, res, next) => {
  try {
    const club = await clubService.findById(req.params.id);
    if (!club) {
      return res.status(404).json({ 
        success: false, 
        message: "Klub tidak ditemukan" 
      });
    }

    const payload = { ...req.body };

    // Jika user mengupload file logo baru
    if (req.file) {
      // 1. Hapus logo lama dari server jika ada
      if (club.logo_club && fs.existsSync(club.logo_club)) {
        try {
          fs.unlinkSync(club.logo_club);
        } catch (err) {
          console.error("Gagal menghapus file lama:", err);
        }
      }
      // 2. Gunakan path logo yang baru
      payload.logo_club = req.file.path.replace(/\\/g, "/");
    }

    const data = await clubService.update(req.params.id, payload);
    res.json({ 
      success: true, 
      message: "Klub berhasil diperbarui", 
      data 
    });
  } catch (error) { 
    // Jika gagal tapi file baru sudah terupload, hapus file baru tersebut
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    next(error); 
  }
};

/**
 * Menghapus klub beserta file logonya
 */
exports.deleteClub = async (req, res, next) => {
  try {
    const club = await clubService.findById(req.params.id);
    if (!club) {
      return res.status(404).json({ 
        success: false, 
        message: "Klub tidak ditemukan" 
      });
    }

    // Hapus file logo fisik dari folder storage
    if (club.logo_club && fs.existsSync(club.logo_club)) {
      try {
        fs.unlinkSync(club.logo_club);
      } catch (err) {
        console.error("Gagal menghapus file saat delete club:", err);
      }
    }

    await clubService.delete(req.params.id);
    res.json({ 
      success: true, 
      message: "Klub berhasil dihapus" 
    });
  } catch (error) { 
    next(error); 
  }
};