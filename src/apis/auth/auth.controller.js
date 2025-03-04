import authServices from "./auth.services";

class authControllers {
  /**
   * @description : Register service
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async register(req, res, next) {
    await authServices.register(req.body);
    return res.send({
      success: true,
      message: "Otp verification mail sent successfully",
    });
  }

  /**
   * @description: Guest Login
   * @param {*} req
   * @param {*} res
   */
  static async guestLogin(req, res) {
    const data = await authServices.guestLogin(req.body);
    return res.send({
      success: true,
      message: "User Login successfully",
      data,
    });
  }

  /**
   * @description: Login
   * @param {*} req
   * @param {*} res
   */
  static async login(req, res) {
    const data = await authServices.login(req.body);
    return res.send({
      success: true,
      message: "User Login successfully",
      data,
    });
  }

  /**
   * @description: Refresh token
   * @param {*} req
   * @param {*} res
   */
  static async refreshToken(req, res) {
    const data = await authServices.refreshToken(req.body, req, res);
    return res.send({
      success: true,
      message: "Accesstoken generate successfully",
      data,
    });
  }

  /**
   * @description: Logout
   * @param {*} req
   * @param {*} res
   */
  static async logout(req, res) {
    await authServices.logout(req.body, req, res);
    return res.send({ success: true, message: "Logged out successfully" });
  }
}

export default authControllers;
