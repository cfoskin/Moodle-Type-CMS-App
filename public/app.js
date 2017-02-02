'use strict';
var moodleApp = angular.module('moodleApp', ['ngRoute', 'toaster', 'ngAnimate', 'ngFileUpload']);
//routes
moodleApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/partials/login.html',
                controller: 'logInController'
            })
            .when('/home', {
                templateUrl: '/partials/home.html',
                controller: 'homeController'
            })
            .when('/createModule', {
                templateUrl: '/partials/createModule.html',
                controller: 'createModuleController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);

moodleApp.directive('navbarDirective', function() {
  return {
    restrict: 'AE',
    templateUrl: '/partials/navbar.html',
    controller: 'navbarController'
  }
});
