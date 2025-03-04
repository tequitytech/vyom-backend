import userControllers from "./user.controller";
import express from "express";
import authentication from "../../common/middleware/authentication";
import asyncHandler from "express-async-handler";

const routes = express.Router();

routes.get(
  "/profile",
  authentication,
  asyncHandler(userControllers.profileDetails)
);

module.exports = routes;
