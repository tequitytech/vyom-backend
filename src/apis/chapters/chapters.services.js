import ChapterCompletionLog from "../../../models/chapterCompletionLog";
import Journey from "../../../models/journey";
import { fetchChapterAndTheirPages } from "../../strapi/chapters.strapi.service";
import { fetchPages } from "../../strapi/pages.strapi.service";

class chapterServices {
  /**
   * @description : Get All Pages by Chapter Document Id
   */
  static async getAllPagesByChapterId(user, chapterId = null) {
    return fetchChapterAndTheirPages(chapterId);
  }

  static async isChapterCompleted(user, chapterId) {
    const chapterCompletion = await ChapterCompletionLog.findOne({
      userId: user._id,
      chapterId: { $in: [chapterId] }, // Check if chapterId exists in the array
    });

    return !!chapterCompletion;
  }

  static async isModuleCompleted(user, moduleId) {
    const chapterCompletion = await ChapterCompletionLog.findOne({
      userId: user._id,
      moduleId: moduleId,
    });

    return chapterCompletion?.isModuleCompleted || false;
  }
}

export default chapterServices;
