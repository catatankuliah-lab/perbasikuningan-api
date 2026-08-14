console.log('[DEBUG-DB] A. Masuk ke file config/sequelize.js');

const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log('[DEBUG-DB] B. Variabel ENV terbaca:', {
  db: process.env.DB_NAME,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
});

console.log('[DEBUG-DB] C. Sedang membuat instance Sequelize...');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

console.log('[DEBUG-DB] D. Instance Sequelize berhasil dibuat!');

module.exports = sequelize;