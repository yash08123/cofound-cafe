const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ["founder", "developer"], required: true },
  password: { type: String, required: true, select: true },
  bio: { type: String },
  whatsapp: { type: String },
  githubLink: { type: String },
  skills: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
