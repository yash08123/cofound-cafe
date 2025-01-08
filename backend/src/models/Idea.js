const mongoose = require("mongoose");

const IdeaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  skills: { type: [String], required: true },
  compensation: { type: String, enum: ["equity", "fixed"], required: true },
  amount: { type: String, required: true },
  industry: { type: String, required: true },
  founderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Idea", IdeaSchema);
