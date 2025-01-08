const Application = require("../models/Application.js");
const AppError = require("../utils/error.js");
const Idea = require("../models/Idea.js");

// Apply to an idea
const applyToIdea = async (req, res, next) => {  
  try {
    const { ideaId, pitch } = req.body;
    const developerId = req.userId;

    const application = new Application({
      ideaId,
      developerId,
      pitch,
    });

    await application.save();

    await Idea.findByIdAndUpdate(
      ideaId,
      { $push: { applications: application._id } }
    );

    res.status(201).json({ status: 'success', data: application });
  } catch (error) {
    next(error);
  }
};

// Get all applications for a founder's idea
const getApplications = async (req, res, next) => {
  try {
    const { ideaId } = req.params;
    const applications = await Application.find({ ideaId })
      .populate("developerId", "name email");
    res.status(200).json({ status: 'success', data: applications });
  } catch (error) {
    next(error);
  }
};

// Update application status
const updateApplicationStatus = async (req, res, next) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const application = await Application.findById(applicationId)
      .populate('ideaId');

    if (!application) {
      throw new AppError('Application not found', 404);
    }

    // Check if the user is the founder of the idea
    if (application.ideaId.founderId.toString() !== req.userId) {
      throw new AppError('Not authorized to update this application', 403);
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      status: 'success',
      data: application
    });
  } catch (error) {
    next(error);
  }
};

// Add this new function
const getMyApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ developerId: req.userId })
      .populate({
        path: 'ideaId',
        select: 'title description compensation',
        populate: {
          path: 'founderId',
          select: 'name phone'
        }
      })
      .populate('developerId', 'name email phone');

    res.status(200).json({
      status: 'success',
      data: applications
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  applyToIdea,
  getApplications,
  updateApplicationStatus,
  getMyApplications
};
