const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const verifyAdmin = require("../middleware/verifyAdmin");
const EmergencyController = require("../controllers/EmergencyController");

router.post("/", verifyJWT, EmergencyController.createEmergency);
router.put("/:id", verifyJWT, EmergencyController.updateEmergency);
router.delete("/:id", verifyJWT, verifyAdmin, EmergencyController.deleteEmergency);
router.get("/", verifyJWT, EmergencyController.getAllEmergencies);
router.get("/:id", verifyJWT, EmergencyController.getEmergencyById);

module.exports = router;
