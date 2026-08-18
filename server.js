console.log('[DEBUG] 1. Memulai server.js...');
const express = require('express');
const cors = require('cors'); // 🎯 Cukup deklarasi di sini sekali
const path = require('path');
require('dotenv').config();

console.log('[DEBUG] 2. Memuat config sequelize...');
const sequelize = require('./config/sequelize');

const app = express();

console.log('[DEBUG] 3. Mengatur middleware...');
app.use(cors()); // 🎯 Izinkan akses dari frontend
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

console.log('[DEBUG] 4. Memuat routes...');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const clubRoutes = require('./routes/clubRoutes');
const playerRoutes = require('./routes/playerRoutes');
const eventRoutes = require('./routes/eventRoutes');
const officialRoutes = require('./routes/officialRoutes');
const matchRoutes = require('./routes/matchRoutes');
const eventParticipationRoutes = require('./routes/eventParticipationRoutes');
const documentRoutes = require('./routes/documentRoutes');
const matchOfficialRoutes = require('./routes/matchOfficialRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const approvalLogRoutes = require('./routes/approvalLogRoutes'); 

console.log('[DEBUG] 5. Semua routes berhasil dimuat!');

// --- ROUTES ENDPOINTS ---
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/officials', officialRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/event-participations', eventParticipationRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/match-officials', matchOfficialRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/approval-logs', approvalLogRoutes);

// Base Endpoint
app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'API System is running'
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
        console.log('[DEBUG] 6. Memverifikasi koneksi database...');
        await sequelize.authenticate();
        console.log('✅ Berhasil terhubung ke database (Sequelize):', process.env.DB_NAME || '');
        
        app.listen(PORT, () => {
            console.log(`🚀 Server berjalan di port ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Gagal konek ke database:', error.message);
        process.exit(1);
    }
};

startServer();