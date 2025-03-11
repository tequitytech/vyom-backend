import { BadRequestException } from "../../common/exceptions/errorException";
import { fetchPageById } from "../../strapi/pages.strapi.service";
import Journey from "../../../models/journey";

class journeyServices {
  static async createJourney(user, data) {
    const page = await fetchPageById(data.pageId);
    if (!page) {
      throw new BadRequestException("Page not found");
    }

    await Journey.create({
      userId: user._id,
      chapterId: page?.chapter?.documentId,
      moduleId: page?.chapter?.module?.documentId,
      ...data,
    });
  }
}

export default journeyServices;
