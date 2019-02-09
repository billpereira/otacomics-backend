const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys.js');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => done(null, user));
});

passport.use(
	new FacebookStrategy(
		{
			clientID: keys.facebookID,
			clientSecret: keys.facebookSecretKey,
			callbackURL: 'http://localhost:5000/auth/facebook/callback',
			// proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
            console.log(profile);
            
			const existingUser = await User.findOne({ facebookID: profile.id });
			if (existingUser) {
				return done(null, existingUser);
			}
			const user = await new User({ facebookID: profile.id }).save();
			done(null, user);
		}
	)
);
