import axios from 'axios';
import appStore from '../stores/appStore';
import eventStore, { Event } from '../stores/eventStore';
import audioStore, { Audio } from '../stores/audioStore';

const getAudio = function() {
  const request = axios.get(appStore.backendurl + '/audio/');
  request
  .then((response) => {
    audioStore.clear();
    console.log(response);
    response.data.audios.map((audio) => {
      audioStore.set(audio.id, new Audio(audio.id, audio.name, audio.form, audio.path));
    })
  })
  .catch((error) => {
    console.log(error);
    alert("Cannot fetch audio files");
  })
}

const addAudio = function(data) {
  const request = axios.post(appStore.backendurl + '/audio/', data);
  return request;

}
const updateAudio = function(id, data) {
  const request = axios.patch(appStore.backendurl + '/audio/' + id, data);
  return request;
}

const deleteAudio = function(id, form) {
  let deleteEvents = [];
  if (form === 1) {
      deleteEvents = Array.from(eventStore).filter((event) => {
          return event[1].music === id;
      })
  }
  else {
      deleteEvents = Array.from(eventStore).filter((event) => {
          return event[1].voice === id;
      })
  }
  if (deleteEvents) {
      deleteEvents.map((event) => {
          eventStore.delete(event[0]);
      })
  }
  const request = axios.delete(appStore.backendurl + '/audio/' + id);
  request
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    alert("Cannot delete audio file");
    console.log(error);
  })

  return request;
}

const testAudio = function(id) {
  const request = axios.post(appStore.backendurl + '/test/audio/' + id);
  return request;
}

const getEvents = function(day) {
  const request = axios.get(appStore.backendurl + '/events/' + day);
  request
  .then((response) => {
    eventStore.clear();
    response.data.events.map((event) => {
      eventStore.set(event.id, new Event(event.id, event.time, event.voice, event.music, event.day))
    })
  })
  .catch((error) => {
    alert("Cannot fetch events from server");
    console.log(error);
  })
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
  request
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  })
}

const testEvent = function(id) {
  const request = axios.post(appStore.backendurl + '/test/event/' + id);
  return request;
}



export { updateAudio,  updateEvent, deleteAudio, deleteEvent, testAudio, testEvent, getAudio, addAudio, getEvents, addEvent };

