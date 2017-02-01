var moodleApp = angular.module('moodleApp');

//the controller for the homepage which has only logging in.
moodleApp.controller('logInController',
    function($scope, $rootScope, $location, userService, loggedInUserService) {

        $scope.logIn = function() {
            let username = $scope.username
            let password = $scope.password;

            userService.getAll().then(function(res) {
                let users = res.data;
                users.forEach(function(user) {
                    if (user.username === username && user.password === password) {
                        loggedInUserService.username = user.username;
                        $location.path('/home');
                    } else {
                        alert("Wrong credentials");
                        $location.path('/');
                    }
                });
            })
        };
    });
