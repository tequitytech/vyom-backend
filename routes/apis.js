import express from "express";
import authRoutes from "../src/apis/auth/auth.router";
import userRoutes from "../src/apis/users/user.router";
import themeRoutes from "../src/apis/themes/themes.router";
import moduleRoutes from "../src/apis/modules/modules.router";
import chapterRoutes from "../src/apis/chapters/chapters.router";
import pageRoutes from "../src/apis/pages/pages.router";

const routes = express.Router();

routes.use("/auth", authRoutes);
routes.use("/user", userRoutes);

routes.use("/themes", themeRoutes);
routes.use("/modules", moduleRoutes);
routes.use("/chapters", chapterRoutes);
routes.use("/pages", pageRoutes);

module.exports = routes;
