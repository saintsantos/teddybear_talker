;(function() {

    function JingleController($scope, $state, JingleService, FileUploader, urlConstant) {

      $scope.editing = false;

      $scope.jingles = [];
      JingleService.getAllJingles().then(function(result) {
        $scope.jingles = result.data;
        console.log($scope.jingles);
      });


      $scope.goToHome = function() {
          $state.go('home');
      }
      $scope.goToFile = function() {
          $state.go('voice');
      }
      $scope.goToSettings = function() {
          $state.go('settings');
      }


      $scope.selectJingle = function(jingle) {
          //call function to get array and assign here.
          $scope.chosen_id = jingle.jingle_id;
          $scope.chosen_jingle = jingle;
          $scope.editing = !$scope.editing;

          //console.log(file);
        }

      $scope.updateJingle = function(jingle) {
          JingleService.updateJingle(jingle).then(function(result) {
            JingleService.getAllJingles().then(function(result) {
              $scope.jingles = result.data;
              $scope.editing = false;
              //console.log(result.data);
            });
          });
      }

        //This handles file uploads
        $scope.uploader = new FileUploader({
          url: urlConstant.baseUrl + '/jingle/upload'
        });

      $scope.deleteJingle = function(id) {
        //console.log(id);
        JingleService.deleteJingle(id).then(function() {
          JingleService.getAllJingles().then(function(result) {
            $scope.jingles = result.data;
          });
        })
      }

    }

  angular
    .module('jingle.controller', ['ui.materialize', 'angularFileUpload'])
    .controller('JingleController', JingleController);
})();
