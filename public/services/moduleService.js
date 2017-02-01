angular.module('moodleApp')
  .service('moduleService', function($http) {
		var modules  = {};

    modules.getOne = function(id) {
      return $http.get('/api/modules/' + id);
    };

		modules.getAll = function(id) {
      return $http.get('/api/modules/');
    };

    return modules;
  });