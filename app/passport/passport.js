const facebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');

module.exports = function(app, passport) {

    // passport.use(new FacebookStrategy({
    //         clientID: FACEBOOK_APP_ID,
    //         clientSecret: FACEBOOK_APP_SECRET,
    //         callbackURL: "http://www.example.com/auth/facebook/callback",
    //         profileFields: ['id', 'displayName', 'photos', 'email']
    //     },
    //     function(accessToken, refreshToken, profile, done) {
    //         // User.findOrCreate(..., function(err, user) {
    //         //     if (err) { return done(err); }
    //         //     done(null, user);
    //         // });
    //         done(null, profile);
    //     }
    // ));
    return passport;
}