import axios from "axios";
import { getStrapiEndpoint, ENDPOINTS } from "../common/config/strapiConfig.js";
import GeneralError from "../common/exceptions/generalError.js";

export const fetchOnboardingData = async () => {
  try {
    // Define deep population query
    const QUERY_PARAMS = {
      populate: {
        video_thumbnail: {
          fields: ["url"],
        },
        image: {
          fields: ["url"],
        },
      },
    };

    const response = await axios.get(getStrapiEndpoint(ENDPOINTS.ONBOARDINGS), {
      params: QUERY_PARAMS,
    });

    return response.data;
  } catch (error) {
    console.log(error?.response);
    throw new GeneralError(
      error?.response?.data?.error?.message ||
        "Strapi Failed to fetch onboarding"
    );
  }
};
