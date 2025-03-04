import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // require: true,
    },
    email: {
      type: String,
      // require: true,
      // index: {
      //   unique: true,
      // },
    },
    verificationOtp: {
      type: Number,
    },
    joinedAt: {
      type: Date,
    },
    deviceId: {
      type: String,
    },
    isGuestUser: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
