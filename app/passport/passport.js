var TwitterStrategy = require('passport-twitter').Strategy; // Import Passport Twitter Package
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; // Import Passport Google Package
var User = require('../models/user'); // Import User Model
var session = require('express-session'); // Import Express Session Package
var jwt = require('jsonwebtoken'); // Import JWT Package
var secret = 'harrypotter'; // Create custom secret to use with JWT

module.exports = function(app, passport) {
	// Start Passport Configuration Settings
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { secure: false } }));
	// End Passport Configuration Settings

	// Serialize users once logged in
	passport.serializeUser(function(user, done) {
		// Check if the user has an active account
		token = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '24h' }); // If account active, give user
		done(null, user.id); // Return user object
	});

	// Deserialize Users once logged out
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user); // Complete deserializeUser and return done
		});
	});

	// Twitter Strategy
	passport.use(
		new TwitterStrategy(
			{
				consumerKey: 'pGgXcESCNWQ8Qzhp9LunA25Kh', // Replace with your Twitter Developer App consumer key
				consumerSecret: 'NOdCTYZQB9KIiZ6xQ41NgHgGwPfhcM69gnVWnhceSkukMjC8Ei', // Replace with your Twitter Developer App consumer secret
				callbackURL: 'http://localhost:8000/auth/twitter/callback', // Replace with your Twitter Developer App callback URL
				userProfileURL: 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
			},
			function(token, tokenSecret, profile, done) {
				// User.findOrCreate(..., function(err, user) {
				// 	if (err) { return done(err); }
				// 	done(null, user);
				//    });
				console.log(profile);
				done(null, profile);
			}
		)
	);

	// Twitter Routes
	app.get('/auth/twitter', passport.authenticate('twitter'));
	app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/twittererror' }), function(
		req,
		res
	) {
		res.redirect('/twitter/' + token); // Redirect user with newly assigned token
	});

	return passport; // Return Passport Object
};
