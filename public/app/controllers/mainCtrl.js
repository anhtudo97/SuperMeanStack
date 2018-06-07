(function() {
	'use strict';

	angular
		.module('mainController', ['authServices'])

		.controller('mainCtrl', [
			'$http',
			'Auth',
			'$timeout',
			'$location',
			function($http, Auth, $timeout, $location) {
				var app = this;

				if (Auth.isLoggedIn()) {
					console.log('Success: User is logged in');
					Auth.getUser().then(function(data) {
						console.log(data.data.username);
						app.username = data.data.username;
					});
				} else {
					console.log('Failure: User is NOT logged in');
				}

				app.doLogin = function(loginData) {
					app.loading = true;
					app.errorMsg = false;

					Auth.login(app.loginData).then(function(data) {
						if (data.data.success) {
							app.loading = false;
							// Create Success message
							app.successMsg = data.data.message + '.... Redirecting';

							// Delay time and redirect to home page
							$timeout(function() {
								$location.path('/about');
							}, 2000);
						} else {
							app.loading = false;
							// Create Error message
							app.errorMsg = data.data.message;
						}
					});
				};

				app.logout = function() {
					Auth.logout();
					$location.path('/logout');
					$timeout(function() {
						$location.path('/');
					}, 2000);
				};
			},
		]);
})();
