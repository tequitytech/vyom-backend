import User from "../../../models/users";
import {
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from "../../common/exceptions/errorException";
import authHelper from "../../common/helper/authHelper";
import RefreshToken from "../../../models/refreshToken";
import { randomNumberGenerator } from "../../common/helper/commonHelper";
import sendMail from "../../common/email";
import UserResource from "../users/resources/user.resource";

class authServices {
  /**
   * @description: Register
   */
  static async register(data) {
    let { email } = data;
    const verificationOtp = await randomNumberGenerator(4);
    const user = await User.findOne({ email });

    if (user) {
      await User.findByIdAndUpdate(user.id, { verificationOtp });
    } else {
      await User.create({
        ...data,
        verificationOtp,
        joinedAt: new Date(),
      });
    }

    const obj = {
      to: email,
      subject: "Welcome to Vyom",
      data: { verificationOtp },
    };
    sendMail(obj, "OtpVerification");
  }

  static async guestLogin(data) {
    const { deviceId } = data;

    let user = await User.findOne({ deviceId });
    if (!user) {
      user = await User.create({ deviceId });
    }

    const accessToken = await authHelper.generateAccessToken({
      userId: user._id,
    });

    const refreshToken = await authHelper.generateRefreshToken({
      userId: user._id,
    });

    return {
      ...new UserResource(user),
      authentication: { accessToken, refreshToken },
    };
  }

  static async login(data) {
    const { email, otp } = data;

    const user = await User.findOne({ email, verificationOtp: otp });

    if (!user) {
      throw new UnauthorizedException("Enter valid OTP");
    }

    await User.findByIdAndUpdate(
      user.id,
      { verificationOtp: null },
      { new: true }
    );

    const accessToken = await authHelper.generateAccessToken({
      userId: user._id,
    });

    const refreshToken = await authHelper.generateRefreshToken({
      userId: user._id,
    });

    return {
      ...new UserResource(user),
      authentication: { accessToken, refreshToken },
    };
  }

  /**
   * @description: Refresh token
   * @param {*} data
   * @param {*} req
   * @param {*} res
   */
  static async refreshToken(data, req, res) {
    const { refreshToken } = data;

    const payload = await authHelper.verifyRefreshToken(refreshToken);

    const storedToken = await RefreshToken.findOne({ token: refreshToken });
    if (!storedToken || storedToken.isRevoked) {
      throw new ForbiddenException("Refresh token is invalid or revoked");
    }

    const newAccessToken = await authHelper.generateAccessToken({
      userId: payload?.userId,
    });

    return {
      accessToken: newAccessToken,
    };
  }

  /**
   * @description: logout
   * @param {*} data
   * @param {*} req
   * @param {*} res
   */
  static async logout(data, req, res) {
    const { refreshToken } = data;

    const storedToken = await RefreshToken.findOne({ token: refreshToken });
    if (!storedToken) {
      throw new NotFoundException("Token not found");
    }

    storedToken.isRevoked = true;
    await storedToken.save();
    return;
  }
}

export default authServices;
