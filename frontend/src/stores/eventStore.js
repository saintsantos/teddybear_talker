import { observable, action, computed } from 'mobx';

class Event {
    @observable id;
    @observable time;
    @observable voice;
    @observable music;
    @observable day;

    constructor(id, time, voice, music, day) {
        this.id = id;
        this.time = time;
        this.voice = voice;
        this.music = music;
        this.day = day;
    }

    @computed get getTime() {
        return this.time;
    }

    @computed get getVoice() {
        return this.voice;
    }

    @computed get getmusic() {
        return this.music;
    }

    @action updateEvent(id, time, voice, music, day) {
        this.time = time;
        this.voice = voice;
        this.music = music;
        this.day = day;
        //Make call here
    }
    
}

const eventStore = observable(new Map());
export default eventStore;
export { Event };
