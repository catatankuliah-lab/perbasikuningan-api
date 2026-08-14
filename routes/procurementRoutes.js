// routes/procurementRoutes.js
const express = require("express");
const router = express.Router();
const ProcurementController = require("../controllers/procurementController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.use(verifyToken);

router.get("/", ProcurementController.getProcurements);
router.post("/", ProcurementController.createProcurement);
router.get("/:id", ProcurementController.getProcurementById);
router.delete("/:id", ProcurementController.deleteProcurement);

module.exports = router;