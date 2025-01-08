const Idea = require("../models/Idea.js");
const AppError = require("../utils/error.js");

// Create a new idea
const createIdea = async (req, res, next) => {
  try {
    const { title, description, skills, compensation, amount, industry } = req.body;
    const idea = new Idea({
      title,
      description,
      skills,
      compensation,
      amount,
      industry,
      founderId: req.userId,
    });
    await idea.save();
    res.status(201).json({ status: 'success', data: idea });
  } catch (error) {
    next(error);
  }
};

// Get all ideas (for developers)
const getIdeas = async (req, res, next) => {
  try {
    console.log('Getting ideas for role:', req.role);

    let ideas;
    if (req.role === 'developer') {
      // Developers can see all ideas
      ideas = await Idea.find()
        .populate('founderId', 'name email')
        .sort({ createdAt: -1 });
      console.log(`Found ${ideas.length} ideas for developers`);
    } else if (req.role === 'founder') {
      // Founders see their own ideas
      ideas = await Idea.find({ founderId: req.userId })
        .populate('founderId', 'name email')
        .sort({ createdAt: -1 });
      console.log(`Found ${ideas.length} ideas for founder`);
    }

    res.status(200).json({ 
      status: 'success',
      data: ideas 
    });
  } catch (error) {
    console.error('Get ideas error:', error);
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

// Update idea (for founders)
const updateIdea = async (req, res, next) => {
  try {
    // First check if the user is the owner of the idea
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      throw new AppError('Idea not found', 404);
    }

    if (idea.founderId.toString() !== req.userId) {
      throw new AppError('You can only edit your own ideas', 403);
    }

    // Update the idea
    const updatedIdea = await Idea.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('founderId', 'name email');

    res.status(200).json({
      status: 'success',
      data: updatedIdea
    });
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

// Get my ideas (for founders)
const getMyIdeas = async (req, res, next) => {
  try {
    console.log('Getting ideas for founder:', req.userId);

    if (req.role !== 'founder') {
      throw new AppError('Unauthorized access', 403);
    }

    const ideas = await Idea.find({ founderId: req.userId })
      .populate('founderId', 'name email phone')
      .populate({
        path: 'applications',
        populate: {
          path: 'developerId',
          select: 'name email phone'
        }
      })
      .sort({ createdAt: -1 });

    console.log(`Found ${ideas.length} ideas for founder`);

    res.status(200).json({
      status: 'success',
      data: ideas
    });
  } catch (error) {
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
