'use strict';
var moodleApp = angular.module('moodleApp', ['ngRoute']);
//routes
moodleApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/partials/login.html',
                controller: 'logInController'
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
