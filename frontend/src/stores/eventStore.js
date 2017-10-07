import { observable, action, computed } from 'mobx';
import axios from 'axios';

class Event {
    @observable id;
    @observable time;
    @observable voice;
    @observable jingle;
    @observable day;

    constructor(id, time, voice, jingle, day) {
        this.id = id;
        this.time = time;
        this.voice = voice;
        this.jingle = jingle;
        this.day = day;
    }

    @computed get getTime() {
        return this.time;
    }

    @computed get getVoice() {
        return this.voice;
    }

    @computed get getJingle() {
        return this.jingle;
    }

    @action updateTime(id, time, voice, jingle, day) {
        this.time = time;
        this.voice = voice;
        this.jingle = jingle;
        this.day = day;
        //Make call here
    }
    
}

const eventStore = observable([]);
eventStore.push(new Event(1, "10:30", 1, 2, "monday"))
eventStore.push(new Event(2, "11:00", 1, 2, "tuesday"))
eventStore.push(new Event(3, "12:00", 3, 2, "wednesday"))
export default eventStore;
export { Event };
