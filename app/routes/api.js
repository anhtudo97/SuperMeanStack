const User = require('../models/user');
var jwt = require('jsonwebtoken');

module.exports = function(router) {

    // http://localhost:port/api/users
    // USER REGISTER ROUTE
    router.post('/users', (req, res) => {
        var user = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
        });
        if (
            req.body.username == null ||
            req.body.username == '' ||
            req.body.password == null ||
            req.body.password == '' ||
            req.body.email == null ||
            req.body.email == ''
        ) {
            res.json({ success: false, message: 'Ensure username, password, email were provided' });
        } else {
            user.save(err => {
                if (err) {
                    res.json({ success: false, message: 'Username or email is existing' });
                } else {
                    res.json({ success: true, message: 'User is created' });
                }
            });
        }
    });

    // http://localhost:port/api/authentication
    // USER LOGIN ROUTE
    router.post('/authentication', function(req, res) {
        User
            .findOne({ username: req.body.username })
            .select('email username password')
            .exec(function(err, user) {
                if (err) {
                    throw err;
                }
                if (!user) {
                    res.json({ success: false, message: 'Could not authentication user' });
                } else {
                    if (user) {
                        if (req.body.password) {
                            var validPassword = user.comparePassword(req.body.password);
                            console.log(user);
                        } else {
                            res.json({ success: false, message: 'No password provided' });
                        }

                        if (!validPassword) {
                            res.json({ success: false, message: 'Could not authentication passoword' });
                        } else {
                            jwt.sign({
                                username: user.username,
                                email: user.email
                            }, 'secret', { expiresIn: '1h' });
                            res.json({ success: true, message: 'User authenticated' });
                        }
                    }

                }
            })
    });

    return router;
};