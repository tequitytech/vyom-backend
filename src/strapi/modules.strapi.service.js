import axios from "axios";
import { getStrapiEndpoint, ENDPOINTS } from "../common/config/strapiConfig.js";
import GeneralError from "../common/exceptions/generalError.js";

export const fetchModules = async (id = null) => {
  try {
    // Construct the endpoint based on whether an ID is provided
    const endpoint = id
      ? getStrapiEndpoint(`${ENDPOINTS.MODULES}/${id}`)
      : getStrapiEndpoint(ENDPOINTS.MODULES);

    // Define deep population query
    const QUERY_PARAMS = {
      populate: {
        chapters: {
          populate: {
            image: {
              fields: ["url"], // Fetch only URL if needed
            },
          },
        },
      },
    };

    const response = await axios.get(endpoint, { params: QUERY_PARAMS });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching modules:",
      error?.response?.data || error.message
    );
    throw new GeneralError(
      error?.response?.data?.error?.message || "Strapi Failed to fetch modules"
    );
  }
};
