var moodleApp = angular.module('moodleApp');

moodleApp.controller('logInController',
    function($scope, $rootScope, $location, userService) {
         $rootScope.loggedInUser = null;
         $rootScope.showNavbar =  false;

        $scope.logIn = function() {
            let username = $scope.username
            let password = $scope.password;

            userService.getAll().then(function(res) {
                let users = res.data;
                users.forEach(function(user) {
                    if (user.username === username && user.password === password) {
                        $rootScope.loggedInUser = user;
                        $rootScope.showNavbar = true;
                        $location.path('/home');
                    } else {
                        alert("Wrong credentials");
                        $location.path('/');
                    }
                });
            })
        };
    });
