import {
  fetchThemeById,
  fetchThemes,
} from "../../strapi/themes.strapi.service";

class themeServices {
  /**
   * @description : Get All Themes
   */
  static async getAllThemes(user) {
    return fetchThemes();
  }

  /**
   * @description : Get Theme By ID
   */
  static async getThemeById(user, themeId) {
    return fetchThemeById(themeId);
  }
}

export default themeServices;
