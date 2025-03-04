import moduleController from "./modules.controller";
import express from "express";
import authentication from "../../common/middleware/authentication";
import asyncHandler from "express-async-handler";

const routes = express.Router();

routes.get("/", authentication, asyncHandler(moduleController.getAllModules));

module.exports = routes;
