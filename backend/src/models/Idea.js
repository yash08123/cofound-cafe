import mongoose from "mongoose";

const IdeaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  skills: { type: [String], required: true },
  compensation: { type: String, enum: ["equity", "fixed"], required: true },
  industry: { type: String, required: true },
  founderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model("Idea", IdeaSchema);
