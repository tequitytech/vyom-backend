import axios from "axios";
import { getStrapiEndpoint, ENDPOINTS } from "../common/config/strapiConfig.js";
import GeneralError from "../common/exceptions/generalError.js";

export const fetchPages = async (chapterId, id = null) => {
  try {
    let endpoint = getStrapiEndpoint(ENDPOINTS.PAGES); // Default to fetching all pages

    let QUERY_PARAMS = {
      populate: {
        video_urls: "*",
        image_urls: {
          fields: ["url"], // Fetch only the URL field from image
        },
        audio_urls: {
          fields: ["url"], // Fetch only the URL field from audio
        },
        questions: {
          populate: {
            options: {
              populate: {
                image: {
                  fields: ["url"], // Ensure options' image is populated with URL
                },
                next_page: {
                  fields: ["documentId"], // Fetch only documentId from next_page
                },
              },
            },
          },
        },
        next_page: {
          fields: ["documentId"], // Fetch only documentId from next_page
        },
      },
    };

    if (id) {
      // Fetch specific page by ID
      endpoint = getStrapiEndpoint(`${ENDPOINTS.PAGES}/${id}`);
    } else if (chapterId) {
      // Fetch all pages where `chapter.id` matches the given chapterId
      QUERY_PARAMS.filters = {
        chapter: { documentId: { $eq: chapterId } },
      };
      QUERY_PARAMS.sort = ["position:asc"];
    }

    const response = await axios.get(endpoint, { params: QUERY_PARAMS });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching pages:",
      error?.response?.data || error.message
    );
    throw new GeneralError(
      error?.response?.data?.error?.message || "Strapi Failed to fetch pages"
    );
  }
};

export const fetchPageById = async (id = null) => {
  try {
    let endpoint = getStrapiEndpoint(ENDPOINTS.PAGES); // Default to fetching all pages

    let QUERY_PARAMS = {
      populate: {
        chapter: {
          fields: ["documentId"],
          populate: {
            module: {
              fields: ["documentId"],
            },
          },
        },
      },
    };

    endpoint = getStrapiEndpoint(`${ENDPOINTS.PAGES}/${id}`);

    const response = await axios.get(endpoint, { params: QUERY_PARAMS });
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching pages:",
      error?.response?.data || error.message
    );
    throw new GeneralError(
      error?.response?.data?.error?.message || "Strapi Failed to fetch pages"
    );
  }
};
