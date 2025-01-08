const express = require("express");
const { createIdea, getIdeas, getIdeaById, updateIdea, deleteIdea, getMyIdeas } = require("../controller/idea.controller.js");
const { authenticate } = require("../middleware/auth.js");

const router = express.Router();

router.get("/", authenticate, getIdeas);
router.get("/user/my-ideas", authenticate, getMyIdeas);
router.post("/", authenticate, createIdea);
router.get("/:id", authenticate, getIdeaById);
router.put("/:id", authenticate, updateIdea);
router.delete("/:id", authenticate, deleteIdea);

module.exports = router;
