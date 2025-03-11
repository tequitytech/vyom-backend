import mongoose from "mongoose";

const journeySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    moduleId: {
      type: String,
    },
    chapterId: {
      type: String,
    },
    pageId: {
      type: String,
    },
    questionId: {
      type: String,
    },
    answerOptionId: {
      type: [String],
    },
    customInputText: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Journey = mongoose.model("Journey", journeySchema);

export default Journey;
