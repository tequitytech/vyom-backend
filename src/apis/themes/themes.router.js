import themeControllers from "./themes.controller";
import express from "express";
import authentication from "../../common/middleware/authentication";
import asyncHandler from "express-async-handler";

const routes = express.Router();

routes.get("/", authentication, asyncHandler(themeControllers.getAllThemes));

routes.get("/:id", authentication, asyncHandler(themeControllers.getThemeById));

module.exports = routes;
