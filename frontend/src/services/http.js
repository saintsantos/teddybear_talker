import axios from 'axios';
import audioStore from '../stores/audioStore';
import eventStore from '../stores/eventStore';
import appStore from '../stores/appStore';

const getAudio = function() {
  const request = axios.get(appStore.backendurl + '/audio/');
  return request;

}

const addAudio = function(data) {
  const request = axios.post(appStore.backendurl + '/audio/', data);
  return request;

}
const updateAudio = function(id, data) {
  const request = axios.patch(appStore.backendurl + '/audio/' + id, data);
  return request;
}

const deleteAudio = function(id) {
  const request = axios.delete(appStore.backendurl + '/audio/' + id);
  return request;
}

const testAudio = function(id) {
  const request = axios.post(appStore.backendurl + '/test/audio/' + id);
  return request;
}

const getEvents = function(day) {
  const request = axios.get(appStore.backendurl + '/events/' + day);
  return request;

}

const addEvent = function(data) {
  const request = axios.post(appStore.backendurl + '/events/', data);
  return request;

}

const updateEvent = function(id, data) {
  const request = axios.patch(appStore.backendurl + '/events/' + id, data);
  return request;
}

const deleteEvent = function(id) {
  const request = axios.delete(appStore.backendurl + '/events/' + id);
  return request;
}

const testEvent = function(id) {
  const request = axios.post(appStore.backendurl + '/test/event/' + id);
}



export { updateAudio,  updateEvent, deleteAudio, deleteEvent, testAudio, testEvent, getAudio, addAudio, getEvents, addEvent };

