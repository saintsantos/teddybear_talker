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

      function updateEvent(updatedEvent) {
        console.log(updatedEvent);
        var xhrParams = {
          method: 'PUT',
          url: urlConstant.baseUrl + '/calendar/' + updatedEvent.id,
          data: updatedEvent
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

      function addEvent(newEvent) {
        var xhrParams = {
          method: 'POST',
          url: urlConstant.baseUrl + '/calendar/add',
          data: newEvent
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
