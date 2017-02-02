var moodleApp = angular.module('moodleApp');

moodleApp.controller('navbarController',
    function($scope, $rootScope, $location) {
      $scope.logOut = function(){
      	$rootScope.loggedInUser = null;
      }
    });
