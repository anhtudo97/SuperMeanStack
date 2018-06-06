angular
	.module('userControllers', ['userServices'])

	.controller('regCtrl', [
		'$http',
		'$location',
		'$timeout',
		'User',
		function($http, $location, $timeout, User) {
			var app = this;

			app.regUser = function(regData) {
				app.loading = true;
				app.errorMsg = false;
				console.log('form submit');

				User.create(app.regData)
				.then(function(data) {
					if (data.data.success) {
						app.loading = false;
						// Create Success message
						app.successMsg = data.data.message + '.... Redirecting';

						// Delay time and redirect to home page
						$timeout(function() {
							$location.path('/');
						}, 2000);
					} else {
						app.loading = false;
						// Create Error message
						app.errorMsg = data.data.message;
					}
				});
			};
		},
	]);
