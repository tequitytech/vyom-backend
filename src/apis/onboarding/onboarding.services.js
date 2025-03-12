import { fetchOnboardingData } from "../../strapi/onboarding.strapi.service";

class onboardingServices {
  static async getOnboardingData() {
    return fetchOnboardingData();
  }
}

export default onboardingServices;
