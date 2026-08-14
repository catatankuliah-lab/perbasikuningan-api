const sequelize = require('../config/sequelize');
const User = require('./userModel');
const Club = require('./clubModel');
const Player = require('./playerModel');
// Tambahkan import model lain di sini

const db = {
  sequelize,
  User,
  Club,
  Player,
};

// Panggil associate jika ada
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;