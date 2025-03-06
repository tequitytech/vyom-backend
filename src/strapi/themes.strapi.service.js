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
    const url = `${getStrapiEndpoint(ENDPOINTS.THEMES)}/${id}`;
    const { data } = await axios.get(url, {
      params: {
        populate: {
          modules: {
            populate: {
              chapters: {
                populate: {
                  image: {
                    fields: ["url"], // Fetch only URL if needed
                  },
                },
              },
            },
          },
        },
      },
    });
    return data;
  } catch (error) {
    console.log(error?.response);
    throw new GeneralError(
      error?.response?.data?.error?.message ||
        `Failed to fetch Strapi theme with ID ${id}`
    );
  }
};
