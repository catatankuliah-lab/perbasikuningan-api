// routes/inventoryRoutes.js
const express = require("express");
const router = express.Router();
const InventoryController = require("../controllers/inventoryController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.use(verifyToken);

router.get("/", InventoryController.getInventory);
router.post("/", InventoryController.createProduct);
router.put("/:id", InventoryController.updateProduct);
router.delete("/:id", InventoryController.deleteProduct);
router.post("/procurement", InventoryController.createProcurement);

module.exports = router;