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
}

export default journeyController;
