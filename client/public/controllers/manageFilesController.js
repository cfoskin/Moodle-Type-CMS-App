var moodleApp = angular.module('moodleApp');

moodleApp.controller('manageFilesController',
    function($scope, $rootScope, $location, $http, moduleService, fileService, Upload, $timeout) {

        fileService.getAll().then((res) => {
            let files = res.data;
            $scope.files = files;
        });

        $scope.currentFile = null;

        $scope.deleteFile = (file) => {
            if ($rootScope.loggedInUser) {
                var index = $scope.files.indexOf(file);
                if (index > -1) {
                    $scope.files.splice(index, 1);
                    fileService.deleteFile(file._id).then((res) => {
                        $location.path('/manageFiles');
                    });
                }
            } else {
                alert("log in to upload a file");
                $location.path('/manageFiles');
            }
        }

        $scope.viewFileInfo = (file) => {
            $scope.currentFile = file;
        }

        $scope.uploadFile = (file) => {
            if ($rootScope.loggedInUser) {
                if ($scope.file) {
                    var file = $scope.file;

                    file.upload = Upload.upload({
                        url: '/api/upload',
                        data: {
                            file: file
                        }
                    });

                    file.upload
                        .then((response) => {
                            let newFile = {};
                            $timeout(() => {
                                file.result = response.data;
                                fileService.postFile(file.result)
                                    .then((res) => {
                                        newFile = res.data.file;
                                    })
                            });
                        }, (response) => {
                            if (response.status > 0)
                                $scope.errorMsg = response.status + ': ' + response.data;
                        }, (evt) => {
                            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

                        });
                    $location.path('/manageFiles');
                } else {
                    alert("No File selected");
                    $location.path('/manageFiles');
                }
            } else {
                alert("log in to upload a file");
                $location.path('/manageFiles');
            }
        }
    });
