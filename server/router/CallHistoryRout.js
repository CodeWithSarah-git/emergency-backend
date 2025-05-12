const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const CallHistoryController = require("../controllers/CallHistoryController");

router.post("/", verifyJWT, CallHistoryController.createCallHistory);
router.get("/", verifyJWT, CallHistoryController.getAllCallHistories);
router.get("/volunteer/:volunteerId", verifyJWT, CallHistoryController.getByVolunteer);
router.get("/emergency/:emergencyId", verifyJWT, CallHistoryController.getByEmergency);

module.exports = router;