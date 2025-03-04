import axios from "axios";
import { getStrapiEndpoint, ENDPOINTS } from "../common/config/strapiConfig.js";
import GeneralError from "../common/exceptions/generalError.js";

export const fetchThemes = async () => {
  try {
    const response = await axios.get(getStrapiEndpoint(ENDPOINTS.THEMES));
    return response.data;
  } catch (error) {
    console.log(error?.response);
    throw new GeneralError(
      error?.response?.data?.error?.message || "Strapi Failed to fetch themes"
    );
  }
};

export const fetchThemeById = async (id) => {
  try {
    const response = await axios.get(
      getStrapiEndpoint(ENDPOINTS.THEMES) + `/${id}` + "?populate=modules"
    );
    return response.data;
  } catch (error) {
    console.log(error?.response);
    throw new GeneralError(
      error?.response?.data?.error?.message ||
        `Failed to fetch Strapi theme with ID ${id}`
    );
  }
};
