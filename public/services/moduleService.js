angular.module('moodleApp')
.service('moduleService', function($http) {
  var api = {
    
    getAll :function(id) {
      return $http.get('/api/modules/');
    },
    getOne : function(id) {
      return $http.get('/api/modules/' + id);
    },
    postModule : function(module) {
      console.log(module);
        return $http.post('/api/modules', module);
      }
  };
  return api;
});