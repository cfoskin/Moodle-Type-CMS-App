var moodleApp = angular.module('moodleApp');

moodleApp.controller('logInController',
    function($scope, $rootScope, $location, userService) {
         $rootScope.loggedInUser = null;
         $rootScope.showNavbar =  false;

        $scope.logIn = () => {
            let username = $scope.username
            let password = $scope.password;

            userService.getAll().then((res) => {
                let users = res.data;
                users.forEach((user) => {
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
