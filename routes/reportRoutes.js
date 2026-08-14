// routes/reportRoutes.js
const express = require("express");
const router = express.Router();
const ReportController = require("../controllers/reportController");
const { verifyToken } = require("../middlewares/authMiddleware");

// Opsional: Batasi hanya role admin/owner yang bisa akses laporan
router.use(verifyToken);

router.get("/omzet", ReportController.getOmzetReport);
router.get("/net-profit", ReportController.getNetProfitReport);
router.get("/best-sellers", ReportController.getBestSellersReport);
router.get("/cash-recap", ReportController.getCashRecapReport);
module.exports = router;