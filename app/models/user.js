var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },

})

UserSchema.pre('save', function(next) {
    let user = this;
    bcrypt.hash(user.password, null, null, (err, hash) => {
        if (err) return next(err);
        user.password = hash
    })
    next();
});

module.exports = mongoose.model('User', UserSchema);