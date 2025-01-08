import Application from "../models/Application.js";

// Apply to an idea
export const applyToIdea = async (req, res) => {
  const { ideaId, pitch } = req.body;
  const developerId = req.userId;

  try {
    const application = new Application({
      ideaId,
      developerId,
      pitch,
    });

    await application.save();
    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all applications for a founder's idea
export const getApplications = async (req, res) => {
  const { ideaId } = req.params;

  try {
    const applications = await Application.find({ ideaId }).populate("developerId", "name email");
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update application status
export const updateApplicationStatus = async (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;

  try {
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;
    await application.save();
    res.status(200).json(application);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
