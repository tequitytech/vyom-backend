import surveyServices from "./survey.services";

class surveyController {
  /**
   * @description: Get data of Survey
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async getSurveyData(req, res) {
    const data = await surveyServices.getSurveyData(req.user);
    return res.send({
      success: true,
      message: "Survey data fetched successfully",
      data: data,
    });
  }

  /**
   * @description : Save Survey service
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async saveSurvey(req, res, next) {
    await surveyServices.saveSurvey(req.user, req.body);
    return res.send({
      success: true,
      message: "Survey stored successfully",
    });
  }
}

export default surveyController;
