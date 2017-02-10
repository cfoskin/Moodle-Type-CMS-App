var moodleApp = angular.module('moodleApp');

moodleApp.controller('manageFilesController',
    function($scope, $rootScope, $location, $http, moduleService, fileService, Upload, $timeout) {
        
    	 fileService.getAll().then(function(res) {
            let files = res.data;
            $scope.files = files;
        });

    	 $scope.deleteFile = function(file) {
            var index = $scope.files.indexOf(file);
            if (index > -1) {
                $scope.files.splice(index, 1);
                fileService.deleteFile(file._id).then(function(res) {
                    $location.path('/manageFiles');
                });
            }
        }

        $scope.uploadFile = function(file) {
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
                                $location.path('/manageFiles');
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
