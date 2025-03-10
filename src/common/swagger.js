import express from "express";
import path from "path";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import { apiBaseUrl } from "./constants/configConstants";

const swaggerDocument = YAML.load(path.join(__dirname, "./../../swagger.yml"));

const routes = express.Router();

routes.use(
  "/api/documentation",
  (req, res, next) => {
    const swaggerBaseUrl = apiBaseUrl();
    console.log("Swagger Base URL:", swaggerBaseUrl); // Debugging

    // Create a fresh copy of swaggerDocument every request
    const swaggerDocCopy = {
      ...swaggerDocument,
      servers: [{ url: swaggerBaseUrl, description: "API base url" }],
    };

    req.swaggerDoc = swaggerDocCopy;
    next();
  },
  swaggerUi.serve,
  (req, res, next) => {
    swaggerUi.setup(req.swaggerDoc, {
      swaggerOptions: {
        persistAuthorization: true,
        docExpansion: "none",
      },
    })(req, res, next);
  }
);

module.exports = routes;
