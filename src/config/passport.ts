import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import { Strategy as OAuth2Strategy } from 'passport-google-oauth2';
import { prisma } from '../db/prisma';

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

// Function to extract JWT from cookies
const cookieExtractor = (req: any): string | null => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
};

// JWT strategy options
const jwtOptions: StrategyOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.SECRET_KEY as string,
};

// JWT Strategy for token validation
passport.use(
  'token',
  new JwtStrategy(jwtOptions, async (payload: JwtPayload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
      });

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

// OAuth2 Strategy for Google login
passport.use(
  new OAuth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: '/api/v1/users/google/callback',
      scope: ['email', 'profile'],
    },
    // @ts-ignore
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find the user by their email
        const user = await prisma.user.findUnique({
          where: { email: profile.emails[0].value },
        });

        // If the user does not exist, return an error or null (sign up is not handled)
        if (!user) {
          return done(null, false, { message: 'User not found. Please sign up first.' });
        }

        // Retrieve the user's role
        const roleAndUser = await prisma.userAndRole.findFirst({
          where: { userId: user.id },
          include: { role: true },
        });

        // Create a payload for JWT
        const payload: JwtPayload = {
          userId: user.id,
          email: user.email,
          role: roleAndUser?.role?.name || 'User',
        };

        // Generate a JWT token
        const token = jwt.sign(payload, process.env.SECRET_KEY as string, { expiresIn: '48h' });

        return done(null, { token });
      } catch (error) {
        return done(error, false);
      }
    }
  )
);


// Serialize user into the session
passport.serializeUser((user: any, done) => {
  done(null, user.token);
});

// Deserialize user from the session
passport.deserializeUser((token: string, done) => {
  jwt.verify(token, process.env.SECRET_KEY as string, async (err, payload) => {
    if (err) return done(err, null);

    if (payload && typeof payload !== 'string') {
      try {
        const user = await prisma.user.findUnique({
          where: { id: (payload as JwtPayload).userId },
        });

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        done(error, false);
      }
    } else {
      done(null, false);
    }
  });
});