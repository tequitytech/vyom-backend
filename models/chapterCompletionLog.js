import mongoose from "mongoose";

const chapterCompletionLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    themeId: {
      type: String,
    },
    moduleId: {
      type: String,
    },
    chapterId: {
      type: [String],
    },
    isModuleCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const ChapterCompletionLog = mongoose.model(
  "chapter_completion_log",
  chapterCompletionLogSchema
);

export default ChapterCompletionLog;
