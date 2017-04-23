var moodleApp = angular.module('moodleApp');

moodleApp.controller('homeController',
    function($scope, $rootScope, $location, moduleService, fileService) {
        $scope.loggedInUser = $rootScope.loggedInUser;

        fileService.getAll().then((res) => {
            let files = res.data;
            $scope.files = files;
        });

        moduleService.getAll().then((res) => {
            let modules = res.data;
            $scope.modules = modules;
            $scope.models = {
                moduleFiles: [],
                files: $scope.files
            };
        });
        $scope.currentModule = null;

        $scope.editModule = (module) => {
            $scope.currentModule = module;
            $scope.models.moduleFiles = $scope.currentModule.files;
        }

        $scope.currentDropElement = null;

        $scope.remove = (l, o) => {
            var index = l.indexOf(o);
            if (index > -1) {
                l.splice(index, 1);
            }
        };

        $scope.deleteFile = (file)=> {
            var index = $scope.currentModule.files.indexOf(file);
            if (index > -1) {
                $scope.currentModule.files.splice(index, 1);
            }
            if (file.modules) {
                var moduleIndex = file.modules.findIndex(item => item.id === $scope.currentModule._id);
                if (moduleIndex > -1) {
                    file.modules.splice(moduleIndex, 1);
                }
            }
            moduleService.updateModule($scope.currentModule).then((res) => {
                fileService.updateFile(file).then((res) =>{
                    $location.path('/home');
                });
            });
        }

        $scope.onDragOver = (data, dragElement, dropElement) => {
            $scope.currentDropElement = dropElement;
        };

        $scope.onDragLeave = () => {
            $scope.currentDropElement = null;
        };

        $scope.onDrop = (data) => {
            if (data && $scope.currentDropElement) {
                if (!$scope.currentModule.files.includes(data)) {
                    $scope.currentModule.files.push(data);
                    let tempModule = {};

                    $scope.currentModule.files.forEach((file) => {
                        tempModule.name = $scope.currentModule.name;
                        tempModule.id = $scope.currentModule._id;
                        if(file.modules){
                             if (file.modules.length < 1) {
                            file.modules = [];
                        } else {
                            file.modules = file.modules;
                        }

                        file.modules.push(tempModule);
                        
                        }
                
                        tempModule = {};

                        fileService.updateFile(file).then((res) =>{
                            moduleService.updateModule($scope.currentModule).then((res)=> {
                                $location.path('/home');
                            });
                        });
                    });


                }
            }
        };
    });
