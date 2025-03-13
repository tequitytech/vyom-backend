import { BadRequestException } from "../../common/exceptions/errorException";
import { fetchSurveyData } from "../../strapi/survey.strapi.service";
import Survey from "../../../models/survey";

class surveyServices {
  static async getSurveyData(user) {
    // Await the fetchSurveyData to get the actual data
    const data = await fetchSurveyData();

    // Use Promise.all to wait for all async operations to complete before returning the result
    const surveysWithUserInteraction = await Promise.all(
      data?.data.map(async (survey) => {
        // Fetch the user's interaction with the survey
        const surveyUserInteraction = await Survey.findOne({
          userId: user._id,
          surveyId: survey.documentId,
        })
          .sort({ createdAt: -1 }) // Sort by creation date, descending
          .exec();

        // Attach the interaction data to the survey object
        survey.surveyUserInteraction = surveyUserInteraction;
        return survey; // Return the survey object with the interaction data
      })
    );

    return surveysWithUserInteraction;
  }

  static async saveSurvey(user, data) {
    const survey = await fetchSurveyData(data.surveyId);
    if (!survey) {
      throw new BadRequestException("Survey not found");
    }

    await Survey.create({
      userId: user._id,
      surveyId: data.surveyId,
      ...data,
    });
  }
}

export default surveyServices;
