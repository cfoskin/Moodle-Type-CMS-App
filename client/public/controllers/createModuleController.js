var moodleApp = angular.module('moodleApp');
/*
This controller contains all functionality for the create module view.
*/
moodleApp.controller('createModuleController',
    function($scope, $rootScope, $location, $http, moduleService, fileService, Upload, $timeout) {
        //function for creating a module
        $scope.createModule = (file) => {
            $scope.loggedInUser = $rootScope.loggedInUser;
            if ($scope.loggedInUser) {
                if ($scope.newModule) {
                    $scope.newModule.userId = $scope.loggedInUser.username;
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
                                let newFil;
                                $timeout(() => {
                                    file.result = response.data;
                                    console.log(file.result);
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
                } else {
                    alert("Must enter module data");
                    $location.path('/createModule');
                }

            }
            else {
                    alert("log in to create a module");
                    $location.path('/logIn');
                }
        };


        fileService.getAll().then((res) => {
            let files = res.data;
            $scope.files = files;
        });


    });
