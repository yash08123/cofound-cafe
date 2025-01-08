const Idea = require("../models/Idea.js");
const AppError = require("../utils/error.js");

// Create a new idea
const createIdea = async (req, res, next) => {
  try {
    const { title, description, skills, compensation, industry } = req.body;
    const idea = new Idea({
      title,
      description,
      skills,
      compensation,
      industry,
      founderId: req.userId,
    });
    await idea.save();
    res.status(201).json({ status: 'success', data: idea });
  } catch (error) {
    next(error);
  }
};

// Get all ideas
const getIdeas = async (req, res, next) => {
  try {
    const ideas = await Idea.find().populate('founderId', 'name email');
    res.status(200).json({ status: 'success', data: ideas });
  } catch (error) {
    next(error);
  }
};

// Get idea by ID
const getIdeaById = async (req, res, next) => {
  try {
    const idea = await Idea.findById(req.params.id).populate('founderId', 'name email');
    if (!idea) {
      throw new AppError('Idea not found', 404);
    }
    res.status(200).json({ status: 'success', data: idea });
  } catch (error) {
    next(error);
  }
};

// Update idea
const updateIdea = async (req, res, next) => {
  try {
    const idea = await Idea.findOneAndUpdate(
      { _id: req.params.id, founderId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!idea) {
      throw new AppError('Idea not found or unauthorized', 404);
    }
    res.status(200).json({ status: 'success', data: idea });
  } catch (error) {
    next(error);
  }
};

// Delete idea
const deleteIdea = async (req, res, next) => {
  try {
    const idea = await Idea.findOneAndDelete({ 
      _id: req.params.id, 
      founderId: req.userId 
    });
    if (!idea) {
      throw new AppError('Idea not found or unauthorized', 404);
    }
    res.status(200).json({ status: 'success', data: null });
  } catch (error) {
    next(error);
  }
};

// Get my ideas
const getMyIdeas = async (req, res, next) => {
  try {
    console.log('Getting ideas for user:', req.userId);

    if (!req.userId) {
      return res.status(401).json({
        status: 'error',
        message: 'User ID is required'
      });
    }

    const ideas = await Idea.find({ founderId: req.userId })
      .populate('founderId', 'name email phone')
      .populate({
        path: 'applications',
        populate: {
          path: 'developerId',
          select: 'name email phone'
        }
      });

    console.log('Found ideas:', ideas);

    return res.status(200).json({
      status: 'success',
      data: ideas || []
    });
  } catch (error) {
    console.error('Get my ideas error:', error);
    next(error);
  }
};

module.exports = {
  createIdea,
  getIdeas,
  getIdeaById,
  updateIdea,
  deleteIdea,
  getMyIdeas
};
