const sequelize = require('../config/sequelize');
const User = require('./userModel');
const Club = require('./clubModel');
const Player = require('./playerModel');
const Event = require('./eventModel');
const Official = require('./officialModel');
const Match = require('./matchModel');
const EventParticipation = require('./eventParticipationModel');
const Document = require('./documentModel');
const MatchOfficial = require('./matchOfficialModel');
const Payment = require('./paymentModel');
const ApprovalLog = require('./approvalLogModel');
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
  Document,
  MatchOfficial,
  Payment,
  ApprovalLog,
};

// Panggil associate jika ada
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;