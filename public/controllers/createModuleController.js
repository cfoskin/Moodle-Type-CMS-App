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
               // for (var i = 0; i < files.length; i++) {
                   // var file = files[i];
                   var file = $scope.file;
                    if (!file.$error) {
                        Upload.upload({
                            url: '/api/upload',
                            data: {
                                username: $scope.username,
                                file: file
                            }
                        }).then(function(resp) {
                            $timeout(function() {
                                $scope.log = 'file: ' +
                                    resp.config.data.file.name +
                                    ', Response: ' + JSON.stringify(resp.data) +
                                    '\n' + $scope.log;
                            });
                        }, null, function(evt) {
                            var progressPercentage = parseInt(100.0 *
                                evt.loaded / evt.total);
                            $scope.log = 'progress: ' + progressPercentage +
                                '% ' + evt.config.data.file.name + '\n' +
                                $scope.log;
                        });
                    }
                }
            //}
        };
    });
