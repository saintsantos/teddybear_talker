;(function() {

    function SettingsController($scope, $state, SystemService) {
        $scope.goToHome = function() {
            $state.go('home');
        }
        $scope.goToFile = function() {
            $state.go('voice');
        }
        $scope.goToJingle = function() {
            $state.go('jingle');
        }

        $scope.sendDate = function() {
          dateTime = {}
          months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
          var date = new Date();
          currentMonth = date.getMonth();

          dateTime.year = date.getFullYear();
          dateTime.month = months[currentMonth];
          dateTime.day = date.getDate();
          dateTime.hour = date.getHours();
          dateTime.minute = date.getMinutes();
          console.log(dateTime);
          SystemService.sendDate(dateTime);

        }
    }

  angular
    .module('settings.controller', ['ui.materialize'])
    .controller('SettingsController', SettingsController);
})();
