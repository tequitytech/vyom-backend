import chapterController from "./chapters.controller";
import express from "express";
import authentication from "../../common/middleware/authentication";
import asyncHandler from "express-async-handler";

const routes = express.Router();

routes.get(
  "/:id",
  authentication,
  asyncHandler(chapterController.getAllPagesByChapterId)
);

module.exports = routes;
