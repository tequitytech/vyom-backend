import { fetchChapterAndTheirPages } from "../../strapi/chapters.strapi.service";

class chapterServices {
  /**
   * @description : Get All Pages by Chapter Document Id
   */
  static async getAllPagesByChapterId(user, chapterId = null) {
    return fetchChapterAndTheirPages(chapterId);
  }
}

export default chapterServices;
