'use strict';
var moodleApp = angular.module('moodleApp', ['ngRoute', 'toaster', 'ngAnimate']);
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
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
]);
