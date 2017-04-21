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
        return $http.post('/api/modules', module);
      },
      updateModule : function(module) {
        return $http.put('/api/modules/' + module._id, module);
      }
  };
  return api;
});