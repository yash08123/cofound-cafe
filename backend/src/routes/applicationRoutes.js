const express = require("express");
const { 
  applyToIdea, 
  getApplications, 
  updateApplicationStatus,
  getMyApplications
} = require("../controller/application.controller.js");
const { authenticate } = require("../middleware/auth.js");

const router = express.Router();

router.post("/", authenticate, applyToIdea);
router.get("/my-applications", authenticate, getMyApplications);
router.get("/:ideaId", authenticate, getApplications);
router.put("/:applicationId", authenticate, updateApplicationStatus);

module.exports = router;
