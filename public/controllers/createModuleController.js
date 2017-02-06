var moodleApp = angular.module('moodleApp');

moodleApp.controller('createModuleController',
    function($scope, $rootScope, $location, $http, moduleService, Upload, $timeout) {
        $scope.createModule = function() {
            moduleService.postModule($scope.newModule).then(function(res) {
                $location.path('/home');
            })
        };
        //});
        $scope.$watch('file', function() {
            $scope.upload($scope.file);
        });
        $scope.$watch('file', function() {
            if ($scope.file != null) {
                $scope.files = [$scope.file];
            }
        });
        $scope.log = '';

        $scope.upload = function(file) {
            if (file) {
                var file = $scope.file;
                if (!file.$error) {
                    Upload.upload({
                        url: '/api/upload',
                        data: {
                            file: file
                        }
                    }).then(function(resp) {

                    }, null, function(evt) {
                        var progressPercentage = parseInt(100.0 *
                            evt.loaded / evt.total);
                        $scope.log = 'progress: ' + progressPercentage +
                            '% ' + evt.config.data.file.name + '\n';
                    });
                }
            }
        };
    });
