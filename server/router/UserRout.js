const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const verifyAdmin = require("../middleware/verifyAdmin");
const Usercontroller = require("../controllers/Usercontroller");

router.post("/", verifyJWT, verifyAdmin, Usercontroller.createUser);
router.put("/:id", verifyJWT, verifyAdmin, Usercontroller.updateUser);
router.delete("/:id", verifyJWT, verifyAdmin, Usercontroller.deleteUser);
router.get("/", verifyJWT, verifyAdmin, Usercontroller.showUser);

module.exports = router;