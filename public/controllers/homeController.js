var moodleApp = angular.module('moodleApp');

moodleApp.controller('homeController',
    function($scope, $rootScope, $location, moduleService, loggedInUserService) {
        $scope.loggedInUser = loggedInUserService.username;
        moduleService.getAll().then(function(res) {
            let modules = res.data;
            $scope.modules = modules;
        })

    });
