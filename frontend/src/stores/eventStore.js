import { observable, action } from 'mobx';
import axios from 'axios';

class EventStore {
    @observable events;

    constructor(events = [{
        id: 1,
        time: "10:34",
        audio: 1,
        day: "monday"
    }, {
        id: 2,
        time: "11:15",
        audio: 1,
        day: "tuesday"
    }, {
        id: 3,
        time: "12:30",
        audio: 3,
        day: "wednesday"
    }]) {
        this.events = events;
    }

    @action fetchEvents = () => {
        axios.get('http://localhost:5000/events/monday').then(res => {
            console.log(res.data.events);
        }).catch(error => {
            console.log(error);
        })
    }

    @action deleteEvent = () => {
        this.events.pop();
    }

    @action addEvent = () => {
        let newEvent = {
            "id": this.events.slice().length + 1,
            "time": "10:30",
            "audio": 0,
            "day": "monday"
        }
        this.events.push(newEvent)
    }

    @action updateEvent = (id, data) => {
        console.log(data);
        const event = this.events.find(event => event.id === id)
        event.time = data.time;
        event.audio = data.audio;
        event.day = data.day;
        console.log(event);
    }
}

const eventStore = new EventStore();
export default eventStore;
export { EventStore };
