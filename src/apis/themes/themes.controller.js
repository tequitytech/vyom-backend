import themeServices from "./themes.services";

class themeControllers {
  /**
   * @description: Get All Themes
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async getAllThemes(req, res) {
    const data = await themeServices.getAllThemes(req.user);
    return res.send({
      success: true,
      message: "Themes fetched successfully",
      ...data,
    });
  }

  /**
   * @description: Get Theme By Id
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async getThemeById(req, res) {
    const data = await themeServices.getThemeById(req.user, req.params.id);
    return res.send({
      success: true,
      message: "Themes fetched successfully",
      data: data,
    });
  }
}

export default themeControllers;
