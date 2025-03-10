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
    swaggerDocument.servers = [
      {
        url: swaggerBaseUrl,
        description: "API base url",
      },
    ];
    req.swaggerDoc = swaggerDocument;
    next();
  },
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: "none",
    },
  })
);

module.exports = routes;
