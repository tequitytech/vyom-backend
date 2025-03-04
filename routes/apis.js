import express from "express";
import authRoutes from "../src/apis/auth/auth.router";
import userRoutes from "../src/apis/users/user.router";
import themeRoutes from "../src/apis/themes/themes.router";
import moduleRoutes from "../src/apis/modules/modules.router";

const routes = express.Router();

routes.use("/auth", authRoutes);
routes.use("/user", userRoutes);

routes.use("/themes", themeRoutes);
routes.use("/modules", moduleRoutes);

module.exports = routes;
