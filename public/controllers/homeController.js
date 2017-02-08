var moodleApp = angular.module('moodleApp');

moodleApp.controller('homeController',
    function($scope, $rootScope, $location, moduleService) {
        $scope.loggedInUser = $rootScope.loggedInUser;
        moduleService.getAll().then(function(res) {
            let modules = res.data;
            $scope.modules = modules;
        })
    });
