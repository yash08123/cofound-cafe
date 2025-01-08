import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  role: { type: String, enum: ["founder", "developer"], required: true },
  password: { type: String, required: true },
  githubLink: { type: String },
  whatsapp: { type: String },
});

// Password hash middleware
UserSchema.pre("save", async function(next) {
  if (this.isModified("password") || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Password comparison
UserSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", UserSchema);
