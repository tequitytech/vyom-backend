import authControllers from "./auth.controller";
import express from "express";
import asyncHandler from "express-async-handler";
import authentication from "../../common/middleware/authentication";
import loginDto from "./dtos/login.dto";
import validator from "../../common/config/joiValidation";

const routes = express.Router();

routes.post(
  "/login",
  validator.body(loginDto),
  asyncHandler(authControllers.register)
);
routes.post("/guest/login", asyncHandler(authControllers.guestLogin));
routes.post("/otp/verify", asyncHandler(authControllers.login));
routes.post("/refresh-token", asyncHandler(authControllers.refreshToken));
routes.post("/logout", authentication, asyncHandler(authControllers.logout));

module.exports = routes;
