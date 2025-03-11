import express from "express";
import validator from "../../common/config/joiValidation";
import asyncHandler from "express-async-handler";
import journeyController from "./journey.controller";
import journeyDto from "./dtos/journey.dto";
import authentication from "../../common/middleware/authentication";

const routes = express.Router();

routes.post(
  "/",
  authentication,
  validator.body(journeyDto),
  asyncHandler(journeyController.createJourney)
);

module.exports = routes;
