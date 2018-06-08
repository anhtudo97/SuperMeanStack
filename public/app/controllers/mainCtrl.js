(function() {
    'use strict';

    angular
        .module('mainController', ['authServices'])

    .controller('mainCtrl', [
        '$http',
        'Auth',
        '$timeout',
        '$location',
        '$rootScope',
        function($http, Auth, $timeout, $location, $rootScope) {
            var app = this;

            app.loadme = false

            $rootScope.$on('$routeChangeStart', function() {
                if (Auth.isLoggedIn()) {
                    console.log('Success: User is logged in');
                    app.isLoggedIn = true;
                    Auth.getUser().then(function(data) {
                        console.log(data.data.username);
                        app.username = data.data.username;
                        app.useremail = data.data.email;
                        app.loadme = true;
                    });
                } else {
                    console.log('Failure: User is NOT logged in');
                    app.isLoggedIn = false;
                    app.username = '';
                    app.loadme = true;
                }
            })

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
                            app.loginData = '';
                            app.successMsg = false;
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