import express from "express";
import { createIdea, getIdeas } from "../controllers/ideaController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, createIdea);
router.get("/", getIdeas);

export default router;
