;(function() {

  angular
    .module('home.service', []),
    .factory('HomeService', function($http, $window, $q, $urlConstant) {

      function getDay(day) {
        var xhrParams = {
          method: 'GET',
          url: urlConstant.baseUrl + '/api/calendar/' + day + '/'
        }
        return $http(xhrParams);
      }

      function getEvent(event) {
        var xhrParams = {
          method: 'GET',
          url: urlConstant.baseUrl + '/api/calendar/' + event.day + '/' + event.hour '/' + event.min + '/'
        }
        return $http(xhrParams);
      }

      function getWeek() {
        var xhrParams = {
          method: 'GET',
          url: urlConstant.baseUrl + '/api/calendar/'
        }
        return $http(xhrParams);
      }

      function updateEvent(event) {
        var xhrParams = {
          method: 'PUT',
          url: urlConstant.baseUrl + '/api/calendar/' + event.day + '/' + event.hour '/' + event.min + '/'
        }
      }

      function deleteEvent(event) {
        var xhrParams = {
          method: 'DELETE',
          url: urlConstant.baseUrl + '/api/calendar/' + event.day + '/' + event.hour '/' + event.min + '/'
        }
        return $http(xhrParams);
      }

      function addEvent(event) {
        var xhrParams = {
          method: 'POST',
          url: urlConstant.baseUrl + '/api/calendar/' + event.day + '/' + event.hour '/' + event.min + '/'
          params: {
            file_id: event.file_id
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
