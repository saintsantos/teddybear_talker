;(function() {

  angular
    .module('home.service', [])
    .factory('HomeService', function($http, $window, $q, urlConstant) {

      function getDay(day) {
        var xhrParams = {
          method: 'GET',
          url: urlConstant.baseUrl + '/api/calendar/' + day + '/',
        }
        return $http(xhrParams);
      }

      function getEvent(day, hour, min) {
        var xhrParams = {
          method: 'GET',
          //url: urlConstant.baseUrl + '/api/calendar/' + day + '/' + hour '/' + min + '/',
        }
        return $http(xhrParams);
      }

      function getWeek() {
        var xhrParams = {
          method: 'GET',
          url: urlConstant.baseUrl + '/api/calendar/',
        }
        return $http(xhrParams);
      }

      function updateEvent(day, hour, min) {
        var xhrParams = {
          method: 'PUT',
          //url: urlConstant.baseUrl + '/api/calendar/' + day + '/' + hour '/' + min + '/',
        }
      }

      function deleteEvent(day, hour, min) {
        var xhrParams = {
          method: 'DELETE',
          //url: urlConstant.baseUrl + '/api/calendar/' + day + '/' + hour '/' + min + '/',
        }
        return $http(xhrParams);
      }

      function addEvent(day, hour, min, file_id) {
        var xhrParams = {
          method: 'POST',
          //url: urlConstant.baseUrl + '/api/calendar/' + day + '/' + hour '/' + min + '/',
          params: {
            file_id: file_id
          }

        }
        return $http(xhrParams);
      }

      return {
        getDay: getDay,
        getEvent: getEvent,
        getWeek: getWeek,
        updateEvent: updateEvent,
        deleteEvent: deleteEvent,
        addEvent: addEvent
      }
    })
})();
