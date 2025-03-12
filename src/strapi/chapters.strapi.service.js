import axios from "axios";
import { getStrapiEndpoint, ENDPOINTS } from "../common/config/strapiConfig.js";
import GeneralError from "../common/exceptions/generalError.js";

export const fetchChapterAndTheirPages = async (id = null) => {
  try {
    // Construct the endpoint based on whether an ID is provided
    const endpoint = getStrapiEndpoint(`${ENDPOINTS.CHAPTERS}/${id}`);

    // Define deep population query
    const QUERY_PARAMS = {
      populate: {
        image: {
          fields: ["url"], // Fetch only the URL field from image
        },
        pages: {
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
                  },
                },
              },
            },
          },
        },
        module: {
          populate: {
            theme: { fields: ["documentId"] }, // Ensure themes are properly populated
          },
        },
      },
    };

    const response = await axios.get(endpoint, { params: QUERY_PARAMS });
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching chapters:",
      error?.response?.data || error.message
    );
    throw new GeneralError(
      error?.response?.data?.error?.message || "Strapi Failed to fetch chapters"
    );
  }
};
