const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Middleware untuk verifikasi JWT Token
 */
exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: Bearer <token>

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Akses ditolak, token tidak ditemukan',
            error_code: 'UNAUTHORIZED'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Menyimpan data user (id, username, role) ke request
        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: 'Token tidak valid atau sudah kadaluwarsa',
            error_code: 'INVALID_TOKEN'
        });
    }
};

/**
 * Middleware untuk pengecekan Role (RBAC)
 * @param {...string} allowedRoles - Daftar role yang diizinkan
 */
exports.authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'User tidak terautentikasi',
                error_code: 'UNAUTHENTICATED'
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Akses dilarang! Role ${req.user.role} tidak memiliki izin untuk aksi ini.`,
                error_code: 'FORBIDDEN_ACCESS'
            });
        }

        next();
    };
};