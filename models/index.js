const sequelize = require('../config/sequelize');
const User = require('./userModel');
// Tambahkan import model lain di sini

const db = {
  sequelize,
  User,
};

// Panggil associate jika ada
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;