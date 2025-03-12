import pageServices from "./pages.services";
import {
  PageResource,
  PageResourceUserInteraction,
} from "./resources/page.resource";

class pageController {
  /**
   * @description: Get Page By Id
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async getPageById(req, res) {
    const data = await pageServices.getPageById(
      req.user,
      req.params.chapterId,
      req.query.pageId
    );
    return res.send({
      success: true,
      message: "Page fetched successfully",
      data: new PageResource(data),
      meta: data?.meta,
      pageUserInteraction: new PageResourceUserInteraction(
        data?.pageUserInteraction
      ),
    });
  }
}

export default pageController;
