import { observable, action} from 'mobx';

class FormStore {
    @observable audioForm;
    @observable eventForm;

    constructor(event = {
        time: "11:00",
        audio: 0,
    }, audio = {
        name: "blank"
    }) {
        this.audioForm = audio;
        this.eventForm = event;
    }

    @action handleAudioFormChange = () => {
        console.log("Changed the audio form");
    }

    @action handleEventFormChange = () => {
        console.log("Changed the event form");
    }
}

const formStore = new FormStore();
export default formStore;
export { FormStore };