var moodleApp = angular.module('moodleApp');

moodleApp.controller('viewModuleController',
    function($scope, $rootScope, $location, $routeParams, moduleService, fileService) {
      var moduleId = $routeParams.id;
       $scope.currentModule;

         moduleService.getOne(moduleId).then((res) => {
           $scope.currentModule = res.data;
        });  

         scope.deleteModule = () =>{
         }
        });
