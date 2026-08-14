console.log('[DEBUG] 1. Memulai server.js...');
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

console.log('[DEBUG] 2. Memuat config sequelize...');
const sequelize = require('./config/sequelize');

const app = express();

console.log('[DEBUG] 3. Mengatur middleware...');
app.use(cors({
  origin: ['http://localhost:5173', 'http://192.168.1.2:5173', 'https://ops.petrolum.cloud', 'http://10.203.229.178:5173'],
  credentials: true
}));

// server.js
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false })); // 🎯 Ubah ke false

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

console.log('[DEBUG] 4. Memuat routes...');
console.log('-> Loading auth & user routes...');
const authRoutes = require('./routes/authRoutes');
console.log('-> Loading user routes...');
const userRoutes = require('./routes/userRoutes'); // 1. Import rutenya
const clubRoutes = require('./routes/clubRoutes');
const playerRoutes = require('./routes/playerRoutes');
const eventRoutes = require('./routes/eventRoutes');
const officialRoutes = require('./routes/officialRoutes');
console.log('[DEBUG] 5. Semua routes berhasil dimuat!');

// --- ROUTES ENDPOINTS ---
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // 2. Daftarkan rutenya di sini
app.use('/api/clubs', clubRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/officials', officialRoutes);
// Base Endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'API Sistem is running'
  });
});

// --- GLOBAL ERROR HANDLER ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
});

// --- SERVER & DATABASE INITIALIZATION ---
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    console.log('[DEBUG] 6. Memverifikasi koneksi database (sequelize.authenticate)...');
    
    // Tes koneksi Sequelize terlebih dahulu
    await sequelize.authenticate();
    console.log('✅ Berhasil terhubung ke database (Sequelize):', process.env.DB_NAME || '');

    console.log('[DEBUG] 7. Menyalakan app.listen...');
    // Baru nyalakan HTTP Express Server
    app.listen(PORT, () => {
      console.log(`🚀 Server berjalan di port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Gagal konek ke database:', error.message);
    process.exit(1);
  }
};

startServer();