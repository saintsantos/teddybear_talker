import { observable, action, computed } from 'mobx';
import axios from 'axios';

class AudioStore {
    @observable audio_files;

    constructor(audio_files = [
        {
            id: 1,
            name: "One Jingle",
            form: 1,
            path: "~/one_jingle.mp3"
        }, {
            id: 2,
            name: "Another Jingle",
            form: 0,
            path: "~/another_jingle.mp3"
        }, {
            id: 3,
            name: "A third jingle",
            form: 1,
            path: "~/a_third_jingle.mp3"
        }
    ]) {
        this.audio_files = audio_files;
    }

    @action fetchAudio = () => {
        console.log("Get all audio files");
    }

    @action deleteAudio = (audio) => {
        this.audio_files.remove(audio);
    }

    @action addAudio = () => {
        //TODO - Add the funcitonality to do the upload from here.
        let newAudio = {
            "id": this.audio_files.slice().length + 1,
            "form": 1,
            "name": "New Audio",
            "path": "~/new_audio.mp3"
        }
        this.audio_files.push(newAudio);
    }

    @action saveAudio = (audio) => {
        console.log(audio);
        //TODO - Make backend call from here
    }
}

const audioStore = new AudioStore();
export default audioStore;
export { AudioStore };
