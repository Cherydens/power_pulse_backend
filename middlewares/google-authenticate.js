const passport = require('passport');
const { Strategy } = require('passport-google-oauth2');
const bcrypt = require('bcryptjs');
const { nanoid } = require('nanoid');

const User = require('../models/user');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = process.env;

const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${BASE_URL}/api/users/google/callback`,
  passReqToCallback: true,
};

const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const { email, displayName, picture } = profile;
    const user = await User.findOne({ email });
    if (user) {
      return done(null, user);
    }

    const avatarUrls = {
      avatar_37x37: picture,
      avatar_46x46: picture,
      avatar_74x74: picture,
      avatar_90x90: picture,
      avatar_92x92: picture,
      avatar_150x150: picture,
      avatar_180x180: picture,
      avatar_300x300: picture,
    };
    const password = await bcrypt.hash(nanoid(), 10);
    const newUser = await User.create({
      email,
      password,
      name: displayName,
      avatarUrls,
    });
    done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use('google', googleStrategy);

module.exports = passport;
