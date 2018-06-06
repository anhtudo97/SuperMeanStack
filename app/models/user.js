var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

var UserSchema = new Schema({
	username: {
		type: String,
		lowercase: true,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		lowercase: true,
		required: true,
		unique: true,
	},
});

UserSchema.pre('save', function(next) {
	let user = this;
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(user.username, salt, function(err, hash) {
			// Store hash in your password DB.
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

module.exports = mongoose.model('User', UserSchema);
