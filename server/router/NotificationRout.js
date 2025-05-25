const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const verifyAdmin = require("../middleware/verifyAdmin");
const NotificationController = require("../controllers/NotificationController");

router.post("/", verifyJWT, NotificationController.createNotification);
router.put("/:id", verifyJWT, NotificationController.updateNotification);
router.get("/", verifyJWT, NotificationController.getAllNotifications);
router.delete("/:id", verifyJWT, verifyAdmin, NotificationController.deleteNotification);

module.exports = router; 