(function() {
	'use strict';

	angular
		.module('authServices', [])

		.factory('Auth', function($http, AuthToken, $q) {
			var authFactory = {};

			authFactory.login = function(loginData) {
				return $http.post('/api/authentication', loginData).then(function(data) {
					AuthToken.setToken(data.data.token);
					return data;
				});
			};

			authFactory.isLoggedIn = function() {
				if (AuthToken.getToken()) return true;
				return false;
			};

			// Function to set token for social media logins

			authFactory.getUser = function() {
				if (AuthToken.getToken()) {
					return $http.post('/api/me');
				} else {
					$q.reject({ message: 'User has no token' });
				}
			};

			authFactory.logout = function() {
				AuthToken.setToken();
			};

			return authFactory;
		})

		.factory('AuthToken', function($window) {
			var authTokenFactory = {};

			// AuthToken.setToken(token)
			authTokenFactory.setToken = function(token) {
				if (token) {
					$window.localStorage.setItem('token', token);
				} else {
					$window.localStorage.removeItem('token');
				}
			};

			// AuthToken.getToken(token)
			authTokenFactory.getToken = function() {
				return $window.localStorage.getItem('token');
			};

			return authTokenFactory;
		})

		.factory('AuthInterceptors', function(AuthToken) {
			var authInterceptorFactory = {};

			authInterceptorFactory.request = function(config) {
				var token = AuthToken.getToken();

				if (token) {
					config.headers['x-access-token'] = token;
				}

				return config;
			};

			return authInterceptorFactory;
		});
})();
