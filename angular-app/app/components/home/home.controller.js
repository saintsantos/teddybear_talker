;(function() {

    function HomeController($scope, $state) {

      $scope.newEvent = false;
        $scope.events = [];
        var event1 = {}
        event1.hour = 10;
        event1.min = 5;
        event1.file = "file1";
        $scope.events.push(event1);

        var event2 = {}
        event2.hour = 9;
        event2.min = 30;
        event2.file = "file2";
        $scope.events.push(event2);

        $scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


        $scope.goToHome = function() {
            $state.go('home');
        }
        $scope.goToSettings = function() {
            $state.go('settings');
        }
        $scope.goToFile = function() {
            $state.go('file');
        }
    
    /*
     var myApp = angular.module('myApp', []);
         
         myApp.directive('fileModel', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;
                  
                  element.bind('change', function(){
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
         }]);
      
         myApp.service('fileUpload', ['$https:', function ($https:) {
            this.uploadFileToUrl = function(file, uploadUrl){
               var fd = new FormData();
               fd.append('file', file);
            
               $https:.post(uploadUrl, fd, {
                  transformRequest: angular.identity,
                  headers: {'Content-Type': undefined}
               })
            
               .success(function(){
               })
            
               .error(function(){
               });
            }
         }]);
      
         myApp.controller('myCtrl', ['$scope', 'fileUpload', function($scope, fileUpload){
            $scope.uploadFile = function(){
               var file = $scope.myFile;
               
               console.log('file is ' );
               console.dir(file);
               
               var uploadUrl = "/fileUpload";
               fileUpload.uploadFileToUrl(file, uploadUrl);
            };
         }]);
    */ 
    
    }

  angular
    .module('home.controller', ['ui.materialize'])
    .controller('HomeController', HomeController);
})();
