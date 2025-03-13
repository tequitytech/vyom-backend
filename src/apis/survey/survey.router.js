import onboardingController from "./survey.controller";
import express from "express";
import asyncHandler from "express-async-handler";
import authentication from "../../common/middleware/authentication";
import surveyDto from "./dtos/survey.dto";
import validator from "../../common/config/joiValidation";

const routes = express.Router();

routes.get(
  "/",
  authentication,
  asyncHandler(onboardingController.getSurveyData)
);

routes.post(
  "/",
  authentication,
  validator.body(surveyDto),
  asyncHandler(onboardingController.saveSurvey)
);

module.exports = routes;
