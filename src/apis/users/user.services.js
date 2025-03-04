import UserResource from "./resources/user.resource";
import User from "../../../models/users";

class userServices {
  /**
   * @description : User profile
   * @param {*} userId
   */
  static async profileDetails(userId) {
    const findUser = await User.findById(userId);
    return { ...new UserResource(findUser) };
  }
}

export default userServices;
