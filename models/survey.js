import mongoose from "mongoose";

const surveySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    surveyId: {
      type: String,
    },
    answers: {
      type: [String],
    },
    isSkipped: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Survey = mongoose.model("survey", surveySchema);

export default Survey;
