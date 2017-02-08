var moodleApp = angular.module('moodleApp');

moodleApp.controller('createModuleController',
    function($scope, $rootScope, $location, $http, moduleService, fileService, Upload, $timeout) {
        $scope.createModule = function(file) {
            var file = $scope.file;
            file.upload = Upload.upload({
                url: '/api/upload',
                data: {
                    file: file
                }
            });
            file.upload
                .then(function(response) {
                    let newFile = {};
                    $timeout(function() {
                        file.result = response.data;
                        fileService.postFile(file.result)
                            .then(function(res) {
                                newFile = res.data.file;
                            })
                            .then(function(res) {
                                $scope.newModule.files = [];
                                $scope.newModule.files.push(newFile);
                                moduleService.postModule($scope.newModule)
                                    .then(function(res) {
                                        $location.path('/home');
                                    })
                            })
                    });
                }, function(response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function(evt) {
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
        }
    });
