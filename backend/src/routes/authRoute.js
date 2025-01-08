const express = require("express");
const { register, login, getProfile, updateProfile } = require("../controller/auth.controller.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", getProfile);
router.put("/profile", updateProfile);

module.exports = router;
