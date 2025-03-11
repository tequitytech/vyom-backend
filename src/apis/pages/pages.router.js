import pageController from "./pages.controller";
import express from "express";
import authentication from "../../common/middleware/authentication";
import asyncHandler from "express-async-handler";

const routes = express.Router();

routes.get(
  "/:chapterId",
  authentication,
  asyncHandler(pageController.getPageById)
);

module.exports = routes;
