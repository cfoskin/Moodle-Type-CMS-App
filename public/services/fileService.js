angular.module('moodleApp')
.service('fileService', function($http) {
  var api = {
    getOne : function(id) {
      return $http.get('/api/files/' + id);
    },
     getAll :function(id) {
      return $http.get('/api/files');
    },
    postFile : function(file) {
        return $http.post('/api/files', file);
      }
  };
  return api;
});