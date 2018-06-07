(function() {
    'use strict';

    angular
        .module('authServices', [])
        .factory('Auth',
            function($http) {
                var authFactory = {};

                authFactory.login = function(loginData) {
                    return $http.post('/api/authentication', loginData);
                };
                return authFactory;
            },
        );

}());