import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "../models/User";

export function generateToken(userId: string): string {
  const payload = { userId };
  return jwt.sign(payload, process.env.JWT_SECRET || "");
}

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.findById(payload.userId);
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (error) {
      done(error, false);
    }
  })
);

export const isAuthenticated = passport.authenticate("jwt", { session: false });
