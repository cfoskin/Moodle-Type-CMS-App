var moodleApp = angular.module('moodleApp');

moodleApp.controller('homeController',
    function($scope, $rootScope, $location, moduleService, fileService) {
        $scope.loggedInUser = $rootScope.loggedInUser;


        fileService.getAll().then(function(res) {
            let files = res.data;
            $scope.files = files;
        });

        moduleService.getAll().then(function(res) {
            let modules = res.data;
            $scope.modules = modules;
            $scope.models = {
                moduleFiles: [],
                files: $scope.files
            };
        });
        $scope.currentModule = null;

        $scope.editModule = function(module) {
            $scope.currentModule = module;
            $scope.models.moduleFiles = $scope.currentModule.files;
        }

        $scope.currentDropElement = null;

        $scope.remove = function(l, o) {
            var index = l.indexOf(o);
            if (index > -1) {
                l.splice(index, 1);
            }
        };

        $scope.deleteFile =  function(file){
            var index =  $scope.currentModule.files.indexOf(file);
            if (index > -1) {
                 $scope.currentModule.files.splice(index, 1);
                moduleService.updateModule($scope.currentModule).then(function(res) {
                        $location.path('/home');
                    });
            }
        }

        $scope.onDragStart = function() {

        };

        $scope.onDragEnd = function() {

        };

        $scope.onDragOver = function(data, dragElement, dropElement) {
            $scope.currentDropElement = dropElement;
        };

        $scope.onDragLeave = function() {
            $scope.currentDropElement = null;
        };

        $scope.onDrop = function(data) {
            if (data && $scope.currentDropElement) {
                if (!$scope.currentModule.files.includes(data)) {
                    $scope.currentModule.files.push(data);
                    moduleService.updateModule($scope.currentModule).then(function(res) {
                        $location.path('/home');
                    });
                }


                // /$scope.models.moduleFiles.push(data);

                // $scope.remove($scope.models.files, data);
            }
        };
    });
