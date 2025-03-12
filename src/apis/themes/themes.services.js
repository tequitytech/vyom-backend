import ChapterCompletionLog from "../../../models/chapterCompletionLog";
import {
  fetchThemeById,
  fetchThemes,
} from "../../strapi/themes.strapi.service";
import chapterServices from "../chapters/chapters.services";

class themeServices {
  /**
   * @description : Get All Themes
   */
  static async getAllThemes(user) {
    return fetchThemes();
  }

  /**
   * @description : Get Theme By ID
   */
  static async getThemeById(user, themeId) {
    const data = await fetchThemeById(themeId);

    for (let i = 0; i < data.modules.length; i++) {
      await this.processModule(user, data.modules, i);
    }

    return data;
  }

  /**
   * @description : Process each module and update its chapters' statuses
   */
  static async processModule(user, modules, moduleIndex) {
    const module = modules[moduleIndex];
    const chapterCompletion = await ChapterCompletionLog.findOne({
      userId: user._id,
      moduleId: module.documentId,
    });

    module.completedChapters = chapterCompletion?.chapterId?.length || 0;
    module.totalChapters = module?.chapters?.length || 0;

    for (let j = 0; j < module.chapters.length; j++) {
      await this.processChapter(user, modules, moduleIndex, j);
    }
  }

  /**
   * @description : Process each chapter to determine its completion and lock status
   */
  static async processChapter(user, modules, moduleIndex, chapterIndex) {
    const module = modules[moduleIndex];
    const chapter = module.chapters[chapterIndex];
    chapter.isCompleted = await chapterServices.isChapterCompleted(
      user,
      chapter.documentId
    );
    chapter.isLocked = await this.determineChapterLockStatus(
      user,
      modules,
      moduleIndex,
      chapterIndex
    );
  }

  /**
   * @description : Determine if a chapter should be locked
   */
  static async determineChapterLockStatus(
    user,
    modules,
    moduleIndex,
    chapterIndex
  ) {
    if (moduleIndex === 0 && chapterIndex === 0) {
      // First chapter of the first module should always be unlocked
      return false;
    }

    if (chapterIndex > 0) {
      // Unlock chapter only if the previous chapter is completed
      const prevChapter = modules[moduleIndex].chapters[chapterIndex - 1];
      return !(await chapterServices.isChapterCompleted(
        user,
        prevChapter.documentId
      ));
    }

    // If it's the first chapter of a module (not the first module), check if the previous module is completed
    const prevModule = modules[moduleIndex - 1];
    return !(await chapterServices.isModuleCompleted(
      user,
      prevModule.documentId
    ));
  }
}

export default themeServices;
