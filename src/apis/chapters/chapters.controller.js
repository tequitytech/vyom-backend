import chapterServices from "./chapters.services";

class chapterController {
  /**
   * @description: Get All Pages by Chapter Document Id
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async getAllPagesByChapterId(req, res) {
    const data = await chapterServices.getAllPagesByChapterId(
      req.user,
      req.params.id
    );
    return res.send({
      success: true,
      message: "Chapter pages fetched successfully",
      ...data,
    });
  }
}

export default chapterController;
