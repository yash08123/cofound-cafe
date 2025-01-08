import Idea from "../models/Idea.js";

// Create a new idea
export const createIdea = async (req, res) => {
  const { title, description, skills, compensation, industry } = req.body;

  try {
    const idea = new Idea({
      title,
      description,
      skills,
      compensation,
      industry,
      founderId: req.userId, // Use the authenticated user's ID
    });
    await idea.save();
    res.status(201).json(idea);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all ideas
export const getIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.status(200).json(ideas);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
