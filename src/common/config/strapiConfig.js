require("dotenv").config();

const STRAPI_BASE_URL =
  process.env.STRAPI_BASE_URL || "http://localhost:1337/api";

// Define API endpoints
const ENDPOINTS = {
  THEMES: "themes",
  MODULES: "modules",
  PAGES: "pages",
  CHAPTERS: "chapters",
};

// Function to construct API URL with dynamic params
const getStrapiEndpoint = (path) => {
  return `${STRAPI_BASE_URL}/${path}`;
};

module.exports = { STRAPI_BASE_URL, getStrapiEndpoint, ENDPOINTS };
