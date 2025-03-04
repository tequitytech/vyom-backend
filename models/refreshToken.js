import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  isRevoked: {
    type: Boolean,
    default: false,
  },
});

refreshTokenSchema.methods.isExpired = function () {
  return Date.now() > this.expiresAt.getTime();
};

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

export default RefreshToken;
