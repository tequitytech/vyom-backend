import { BadRequestException } from "../../common/exceptions/errorException";
import { fetchPageById } from "../../strapi/pages.strapi.service";
import Journey from "../../../models/journey";
import ChapterCompletionLog from "../../../models/chapterCompletionLog";

import { fetchChapterAndTheirPages } from "../../strapi/chapters.strapi.service";
import { fetchModules } from "../../strapi/modules.strapi.service";

class journeyServices {
  static async createJourney(user, data) {
    const page = await fetchPageById(data.pageId);
    if (!page) {
      throw new BadRequestException("Page not found");
    }

    await Journey.create({
      userId: user._id,
      chapterId: page?.chapter?.documentId,
      moduleId: page?.chapter?.module?.documentId,
      ...data,
    });
  }

  static async completeChapter(user, data) {
    const chapter = await fetchChapterAndTheirPages(data.chapterId);
    const existChapterCompletionLogs = await ChapterCompletionLog.findOne({
      userId: user._id,
      moduleId: chapter.module.documentId,
      themeId: chapter.module.theme.documentId,
    });

    if (existChapterCompletionLogs) {
      // Check if chapterId is already in the array
      if (!existChapterCompletionLogs.chapterId.includes(data.chapterId)) {
        await ChapterCompletionLog.updateOne(
          { _id: existChapterCompletionLogs._id },
          { $push: { chapterId: data.chapterId } }
        );
      }
    } else {
      // Create a new entry if not exists
      await ChapterCompletionLog.create({
        userId: user._id,
        chapterId: [data.chapterId], // Store as an array initially
        moduleId: chapter.module.documentId,
        themeId: chapter.module.theme.documentId,
      });
    }
    // If all chapter completed then do complete module
    await this.completeModuleWhenChapterComplete(chapter, user);
  }

  static async completeModuleWhenChapterComplete(chapterData, user) {
    const { data: module } = await fetchModules(chapterData.module.documentId);
    const existChapterCompletionLogs = await ChapterCompletionLog.findOne({
      userId: user._id,
      moduleId: chapterData.module.documentId,
      themeId: chapterData.module.theme.documentId,
    });

    if (
      existChapterCompletionLogs.chapterId.length === module.chapters.length
    ) {
      await ChapterCompletionLog.updateOne(
        { _id: existChapterCompletionLogs._id },
        { isModuleCompleted: true }
      );
    }
  }
}

export default journeyServices;
