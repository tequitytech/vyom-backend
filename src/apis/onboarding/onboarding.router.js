import onboardingController from "./onboarding.controller";
import express from "express";
import asyncHandler from "express-async-handler";

const routes = express.Router();

routes.get("/", asyncHandler(onboardingController.getOnboardingData));

module.exports = routes;
