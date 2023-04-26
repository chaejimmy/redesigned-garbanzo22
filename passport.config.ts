import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import prisma from "../libs/prismadb";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { email:username } });

      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }

      const passwordValid = password === user.hashedPassword;

      if (!passwordValid) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
