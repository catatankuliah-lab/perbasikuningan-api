const sequelize = require('../config/sequelize');
const User = require('./userModel');
const Club = require('./clubModel');
// Tambahkan import model lain di sini

const db = {
  sequelize,
  User,
  Club,
};

// Panggil associate jika ada
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;