const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
require('dotenv').config();

// Define a Mongoose schema for storing user information
const authUserSchema = new mongoose.Schema({
    googleId: String,
    name: String,
    email: String,
    profilePhoto: String,
});

// Use the correct model name 'User'
const User = mongoose.model('authUser', authUserSchema);

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    console.log('User profile:', profile);

    const { id, displayName, emails, photos } = profile;

    try {
        // Use 'User' instead of 'authUser'
        let user = await User.findOne({ googleId: id });

        if (!user) {
            user = new User({
                googleId: id,
                name: displayName,
                email: emails[0].value, // Assumes the first email is primary
                profilePhoto: photos[0].value // Assumes the first photo is primary
            });

            await user.save();
            console.log('New user created:', user);
        } else {
            console.log('User already exists:', user);
        }

        cb(null, user);
    } catch (err) {
        console.error('Error saving user to database:', err);
        cb(err, null);
    }
  }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
