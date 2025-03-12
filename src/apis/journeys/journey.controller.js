import journeyServices from "./journey.services";

class journeyController {
  /**
   * @description : Journey service
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async createJourney(req, res, next) {
    await journeyServices.createJourney(req.user, req.body);
    return res.send({
      success: true,
      message: "Page Journey stored successfully",
    });
  }

  /**
   * @description : Complete Chapter
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async completeChapter(req, res, next) {
    await journeyServices.completeChapter(req.user, req.body);
    return res.send({
      success: true,
      message: "Chapter completed successfully",
    });
  }
}

export default journeyController;
