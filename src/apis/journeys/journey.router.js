import express from "express";
import validator from "../../common/config/joiValidation";
import asyncHandler from "express-async-handler";
import journeyController from "./journey.controller";
import journeyDto from "./dtos/journey.dto";
import authentication from "../../common/middleware/authentication";
import chapterCompleteDto from "./dtos/chapter-complete.dto";

const routes = express.Router();

routes.post(
  "/",
  authentication,
  validator.body(journeyDto),
  asyncHandler(journeyController.createJourney)
);

routes.post(
  "/chapter-complete",
  authentication,
  validator.body(chapterCompleteDto),
  asyncHandler(journeyController.completeChapter)
);

module.exports = routes;
