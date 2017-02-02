angular.module('moodleApp')
  .service('userService', function($http) {
  var api = {
    
    getAll : function(id) {
      return $http.get('/api/users/');
    },
    getOne : function(id) {
      return $http.get('/api/users/' + id);
    },
    createUser: function(user) {
        return $http.post('/api/users', user);
      }
  };
  return api;
});