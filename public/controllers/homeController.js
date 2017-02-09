var moodleApp = angular.module('moodleApp');

moodleApp.controller('homeController',
    function($scope, $rootScope, $location, moduleService, fileService) {
        $scope.loggedInUser = $rootScope.loggedInUser;

        fileService.getAll().then(function(res) {
            let files = res.data;
            $scope.files = files;
            console.log($scope.files);
        })
        moduleService.getAll().then(function(res) {
            let modules = res.data;
            $scope.modules = modules;
        });
    });
