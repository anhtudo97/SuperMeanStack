const User = require('../models/user');

module.exports = router => {
	router.post('/users', (req, res) => {
		let user = new User({
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
	return router;
};
