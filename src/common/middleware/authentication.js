import passport from "passport";
import { unAuthorized } from "../exceptions/statusCodes";

const authentication = async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (!user) {
      return res.status(unAuthorized).json({
        success: false,
        status: unAuthorized,
        message: "Unauthorized",
      });
    }

    req.user = user;
    return next();
  })(req, res, next);
};

export default authentication;
