import { fetchModules } from "../../strapi/modules.strapi.service";

class moduleServices {
  /**
   * @description : Get All Modules or module data by Id
   */
  static async getAllModules(user, moduleId = null) {
    return fetchModules(moduleId);
  }
}

export default moduleServices;
