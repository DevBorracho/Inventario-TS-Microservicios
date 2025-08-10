import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, trim: true },
    email: { type: String, unique: true },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
