import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../../../models/users";
import { JWT } from "../constants/constants";
import { notFound } from "../exceptions/statusCodes";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT.ACCESS_TOKEN_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.userId);

      if (user) {
        return done(null, user);
      } else {
        return done(null, false, {
          success: false,
          status: notFound,
          message: "User not found",
        });
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
