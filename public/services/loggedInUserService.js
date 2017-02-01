var moodleApp = angular.module('moodleApp');

moodleApp.service('loggedInUserService', function() {
  return {
      username : ''
  };
});