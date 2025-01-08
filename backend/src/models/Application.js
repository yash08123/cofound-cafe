import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  ideaId: { type: mongoose.Schema.Types.ObjectId, ref: "Idea", required: true },
  developerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  pitch: { type: String, required: true },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
});

export default mongoose.model("Application", ApplicationSchema);
