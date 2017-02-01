angular.module('moodleApp')
  .service('userService', function($http) {
		var users  = {};

    users.getOne = function(id) {
      return $http.get('/api/users/' + id);
    };

		users.getAll = function(id) {
      return $http.get('/api/users/');
    };
    
    return users;
  });