;(function() {

  angular
    .module('home.service', [])
    .factory('HomeService', function($http, $window, $q, urlConstant) {

      function getDay(day) {
        var xhrParams = {
          method: 'GET',
          url: urlConstant.baseUrl + '/calendar/' + day
        }
        return $http(xhrParams);
      }

      /*function getEvent(day, hour, min) {
        var xhrParams = {
          method: 'GET',
          url: urlConstant.baseUrl + '/api/calendar/' + day + '/' + hour '/' + min + '/',
        }
        return $http(xhrParams);
      }*/

      function getWeek() {
        var xhrParams = {
          method: 'GET',
          url: urlConstant.baseUrl + '/calendar/',
        }
        return $http(xhrParams);
      }

      function updateEvent(event, changes) {
        var xhrParams = {
          method: 'PUT',
          url: urlConstant.baseUrl + '/calendar/' + event.id,
          data: changes
        }
        return $http(xhrParams);
      }

      function deleteEvent(id) {
        var xhrParams = {
          method: 'DELETE',
          url: urlConstant.baseUrl + '/calendar/' + id
        }
        return $http(xhrParams);
      }

      function addEvent(event) {
        var xhrParams = {
          method: 'POST',
          url: urlConstant.baseUrl + '/calendar/add',
          params: {
            day: event.day,
            hour: event.hour,
            minute: event.min,
            file_id: event.file_id
          }
        }
        return $http(xhrParams);
      }

      return {
        getDay: getDay,
        getWeek: getWeek,
        updateEvent: updateEvent,
        deleteEvent: deleteEvent,
        addEvent: addEvent
      }
    })
})();
