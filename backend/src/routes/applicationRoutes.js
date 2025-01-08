import express from "express";
import { applyToIdea, getApplications, updateApplicationStatus } from "../controllers/applicationController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, applyToIdea);
router.get("/:ideaId", authenticate, getApplications);
router.put("/:applicationId", authenticate, updateApplicationStatus);

export default router;
