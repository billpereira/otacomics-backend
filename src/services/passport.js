// Passport settled with Facebook Strategy
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');

// Take the keys for right environment and assign the model defined on users.js
const keys = require('../config/keys.js');
const User = mongoose.model('users');

// The user ID is serialized to the session, keeping the amount of data stored
// within the session small. When subsequent requests are received, this ID is
// used to find the user, which will be restored to req.user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});

// Facebook stratedy needs 3 attributes clientIT, clientSecret and callbackURL
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookID,
      clientSecret: keys.facebookSecretKey,
      callbackURL: 'http://localhost:5000/auth/facebook/callback'
      // proxy: true
    },
    // Using an async function to get profile and extract the
    // facebookID and name
    async (accessToken, refreshToken, profile, done) => {
      // before create check if the user is already registered
      const existingUser = await User.findOne({ facebookID: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      // await object to be saved on db
      const user = await new User({
        facebookID: profile.id,
        name: profile.displayName
      }).save();

      done(null, user);
    }
  )
);
