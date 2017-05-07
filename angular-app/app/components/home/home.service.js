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
          url: urlConstant.baseUrl + '/calendar/' + updatedEvent.event_id,
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

      function testEvent(id) {
        var xhrParams = {
          method: 'POST',
          url: urlConstant.baseUrl + '/test/event/' + id
        }
        return $http(xhrParams);
      }

      return {
        getDay: getDay,
        getWeek: getWeek,
        updateEvent: updateEvent,
        deleteEvent: deleteEvent,
        addEvent: addEvent,
        testEvent: testEvent
      }
    })
})();
