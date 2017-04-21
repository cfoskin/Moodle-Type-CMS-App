var moodleApp = angular.module('moodleApp');

moodleApp.controller('createModuleController',
    function($scope, $rootScope, $location, $http, moduleService, fileService, Upload, $timeout) {
        $scope.createModule = (file) => {

            var file = $scope.file;
            if (file) {
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
                                .then((res) => {
                                    $scope.newModule.files = [];
                                    $scope.newModule.files.push(newFile);
                                    moduleService.postModule($scope.newModule)
                                        .then((res) => {
                                            $location.path('/home');
                                        })
                                })
                        });
                    }, (response) => {
                        if (response.status > 0)
                            $scope.errorMsg = response.status + ': ' + response.data;
                    }, (evt) => {
                        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    });
            } else {
                moduleService.postModule($scope.newModule)
                    .then((res) => {
                        $location.path('/home');
                    });
            }
        };


        fileService.getAll().then((res) => {
            let files = res.data;
            $scope.files = files;
        });

        
    });
