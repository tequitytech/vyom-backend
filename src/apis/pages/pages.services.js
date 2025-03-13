import Journey from "../../../models/journey";
import { BadRequestException } from "../../common/exceptions/errorException";
import { fetchPages } from "../../strapi/pages.strapi.service";

class pageServices {
  /**
   * Get Page details and first page
   * @param {*} user
   * @param {*} chapterId
   * @param {*} pageId
   * @returns
   */
  static async getPageById(user, chapterId, pageId = null) {
    const pages = await fetchPages(chapterId);

    if (!pages?.data?.length) {
      throw new BadRequestException("Not Found any page with this chapterId");
    }

    if (pageId) {
      return this.getSpecificPage(pages, pageId, user);
    }

    return this.getFirstPage(pages, user);
  }

  /**
   * Get Specific Page Details
   * @param {*} pages
   * @param {*} pageId
   * @returns
   */
  static async getSpecificPage(pages, pageId, user) {
    const pageIndex = pages.data.findIndex(
      (page) => page.documentId === pageId
    );
    if (pageIndex === -1) {
      throw new BadRequestException("Page not found");
    }

    const page = pages.data[pageIndex];
    const pageUserInteraction = await Journey.findOne({
      pageId,
      userId: user._id,
    })
      .sort({
        createdAt: -1,
      })
      .exec();
    return {
      ...page,
      next_page: this.findNextPageId(pages.data, pageIndex),
      meta: { pagination: { ...pages.meta.pagination, page: pageIndex + 1 } },
      pageUserInteraction,
    };
  }

  /**
   * Get First page details of chapter
   * @param {*} pages
   * @returns
   */
  static async getFirstPage(pages, user) {
    const firstPage = pages.data[0];
    const pageUserInteraction = await Journey.findOne({
      pageId: firstPage.documentId,
      userId: user._id,
    })
      .sort({
        createdAt: -1,
      })
      .exec();
    return {
      ...firstPage,
      next_page: this.findNextPageId(pages.data, 0),
      pageUserInteraction,
      meta: pages.meta,
    };
  }

  /**
   * Find next page Id
   * @param {*} pagesData
   * @param {*} index
   * @returns
   */
  static findNextPageId(pagesData, index) {
    return (
      pagesData[index]?.next_page?.documentId ||
      pagesData[index + 1]?.documentId ||
      null
    );
  }
}

export default pageServices;
