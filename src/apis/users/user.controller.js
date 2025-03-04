import userServices from "./user.services";

class userControllers {
  /**
   * @description: user profile
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async profileDetails(req, res) {
    const data = await userServices.profileDetails(req.user);
    return res.send({
      success: true,
      message: "User Profile fetched successfully",
      data,
    });
  }
}

export default userControllers;
