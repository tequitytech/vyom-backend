import axios from "axios";
import { getStrapiEndpoint, ENDPOINTS } from "../common/config/strapiConfig.js";
import GeneralError from "../common/exceptions/generalError.js";

export const fetchSurveyData = async (id = null) => {
  try {
    // Construct the endpoint dynamically based on the `id` parameter
    const endpoint = id
      ? `${getStrapiEndpoint(ENDPOINTS.SURVEYS)}/${id}` // Fetch survey by ID
      : getStrapiEndpoint(ENDPOINTS.SURVEYS); // Fetch all surveys

    // Define the deep population query parameters
    const QUERY_PARAMS = {
      populate: {
        options: "*",
      },
    };

    // Send the GET request to the appropriate endpoint
    const response = await axios.get(endpoint, { params: QUERY_PARAMS });

    return response.data;
  } catch (error) {
    // Log error response for debugging
    console.log(error?.response);

    // Throw a custom error with a message
    throw new GeneralError(
      error?.response?.data?.error?.message || "Strapi Failed to fetch survey"
    );
  }
};
