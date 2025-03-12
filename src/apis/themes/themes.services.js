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
      const module = data.modules[i];

      for (let j = 0; j < module.chapters.length; j++) {
        const chapter = module.chapters[j];

        // Check if the chapter is completed
        const isCompleted = await chapterServices.isChapterCompleted(
          user,
          chapter.documentId
        );
        chapter.isCompleted = isCompleted;
        // Determine if the chapter should be locked
        if (i === 0 && j === 0) {
          // First chapter of the first module should always be unlocked
          chapter.isLocked = false;
        } else if (j > 0) {
          // Unlock chapter only if the previous chapter is completed
          const prevChapter = module.chapters[j - 1];
          const prevCompleted = await chapterServices.isChapterCompleted(
            user,
            prevChapter.documentId
          );
          chapter.isLocked = !prevCompleted;
        } else {
          // If all chapters in the previous module are completed, unlock the first chapter of this module
          const prevModule = data.modules[i - 1];
          const allPrevChaptersCompleted =
            await chapterServices.isModuleCompleted(
              user,
              prevModule.documentId
            );

          chapter.isLocked = !allPrevChaptersCompleted;
        }
      }
    }

    return data;
  }
}

export default themeServices;
