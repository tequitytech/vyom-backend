import themeServices from "./modules.services";

class moduleController {
  /**
   * @description: Get All Modules
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async getAllModules(req, res) {
    const data = await themeServices.getAllModules(req.user, req.query.id);
    return res.send({
      success: true,
      message: "Modules fetched successfully",
      ...data,
    });
  }
}

export default moduleController;
