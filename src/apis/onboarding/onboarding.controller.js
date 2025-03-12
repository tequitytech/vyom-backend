import onboardingServices from "./onboarding.services";

class onboardingController {
  /**
   * @description: Get data of Onboarding
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async getOnboardingData(req, res) {
    const data = await onboardingServices.getOnboardingData();
    return res.send({
      success: true,
      message: "Onboarding data fetched successfully",
      ...data,
    });
  }
}

export default onboardingController;
