const express = require("express");
const router = express.Router();
const allocationController = require("../../controllers/allocationController");
const { authMiddleware } = require("../../middleware/auth");

// Create allocation
router.post("/", authMiddleware, allocationController.createAllocation);

// List allocations
router.get("/", allocationController.listAllocations);

// Get allocation details
router.get("/:id", allocationController.getAllocation);

// Get allocation history
router.get("/:id/history", allocationController.getAllocationHistory);

// Update allocation status
router.patch("/:id/status", authMiddleware, allocationController.updateAllocationStatus);

// Verify allocation
router.get("/:id/verify", allocationController.verifyAllocation);

module.exports = router;