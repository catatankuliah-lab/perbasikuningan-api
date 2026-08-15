const sequelize = require('../config/sequelize');
const User = require('./userModel');
const Club = require('./clubModel');
const Player = require('./playerModel');
const Event = require('./eventModel');
const Official = require('./officialModel');
const Match = require('./matchModel');
const EventParticipation = require('./eventParticipationModel');
// Tambahkan import model lain di sini

const db = {
  sequelize,
  User,
  Club,
  Player,
  Event,
  Official,
  Match,
  EventParticipation,
};

// Panggil associate jika ada
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;