;(function() {

  angular
    .module('settings.service', [])
    .factory('SystemService', function($http, $window, $q, urlConstant) {

      function reboot() {
        var xhrParams = {
          method: 'POST',
          url: urlConstant.baseUrl + '/system/reboot'
        }
        return $http(xhrParams);
      }

      function sendDate(dateTime) {
        var xhrParams = {
          method: 'POST',
          url: urlConstant.baseUrl + '/system/date',
          data: dateTime
        }
        return $http(xhrParams);
      }

      return {
        reboot: reboot,
        sendDate: sendDate
      }

    });


})();
