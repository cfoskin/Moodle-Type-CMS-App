var moodleApp = angular.module('moodleApp');

moodleApp.controller('viewModuleController',
    function($scope, $rootScope, $location, $routeParams, moduleService, fileService) {
        var moduleId = $routeParams.id;
        $scope.currentModule;

        moduleService.getOne(moduleId).then((res) => {
            $scope.currentModule = res.data;
        });

        $scope.deleteModule = (currentModule) => {
            moduleService.deleteModule(currentModule).then((res) => {
                fileService.getAll().then((res) => {
                    let files = res.data;
                    files.forEach((file) => {
                        if (file.modules) {
                            file.modules.forEach((module) => {
                                if (module.id === $scope.currentModule._id) {
                                    var index = file.modules.indexOf(module);
                                    if (index > -1) {
                                        file.modules.splice(index, 1);
                                    }
                                }
                            })
                        }
                    })
                });
                $location.path('/home');
            });
        }
    });
