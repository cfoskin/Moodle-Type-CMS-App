var moodleApp = angular.module('moodleApp');
moodleApp.controller('createModuleController', 
    function($scope, $rootScope, $location, moduleService) {
    $scope.createModule = function() {
        moduleService.postModule($scope.newModule).then(function(res) {
            $location.path('/home');
        })
    };
});

// moodleApp.controller('createModuleController', 
//     ['$scope', 'Upload', '$timeout', function($scope, Upload, $timeout, moduleService) {

//     $scope.createModule = function() {
//                 debugger;

//         moduleService.postModule($scope.newModule).then(function(res) {
//             console.log(res);
//             $location.path('/home');
//         })
//     }



//     $scope.$watch('files', function() {
//         $scope.upload($scope.files);
//     });
//     $scope.$watch('file', function() {
//         if ($scope.file != null) {
//             $scope.files = [$scope.file];
//         }
//     });
//     $scope.log = '';

//     $scope.upload = function(files) {
//         if (files && files.length) {
//             for (var i = 0; i < files.length; i++) {
//                 var file = files[i];
//                 if (!file.$error) {
//                     Upload.upload({
//                         url: 'https://angular-file-upload.s3.amazonaws.com/', //S3 upload url including bucket name
//                         method: 'POST',
//                         data: {
//                             // key: file.name, // the key to store the file on S3, could be file name or customized
//                             // AWSAccessKeyId: < YOUR AWS AccessKey Id > ,
//                             // acl: 'private', // sets the access to the uploaded file in the bucket: private, public-read, ...
//                             // policy: $scope.policy, // base64-encoded json policy (see article below)
//                             // signature: $scope.signature, // base64-encoded signature based on policy string (see article below)
//                             // "Content-Type": file.type != '' ? file.type : 'application/octet-stream', // content type of the file (NotEmpty)
//                             // filename: file.name, // this is needed for Flash polyfill IE8-9
//                             // file: file
//                         }
//                     }).then(function(resp) {
//                         $timeout(function() {
//                             $scope.log = 'file: ' +
//                                 resp.config.data.file.name +
//                                 ', Response: ' + JSON.stringify(resp.data) +
//                                 '\n' + $scope.log;
//                         });
//                     }, null, function(evt) {
//                         var progressPercentage = parseInt(100.0 *
//                             evt.loaded / evt.total);
//                         $scope.log = 'progress: ' + progressPercentage +
//                             '% ' + evt.config.data.file.name + '\n' +
//                             $scope.log;
//                     });
//                 }
//             }
//         }
//     };
// }]);
