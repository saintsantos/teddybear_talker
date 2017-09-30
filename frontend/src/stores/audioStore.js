import { observable } from 'mobx';

class AudioStore {
    @observable audio_files;

    constructor(audio_files = []) {
        this.audio_files = audio_files;
    }
}

const audioStore = new AudioStore();
export default audioStore;
export { AudioStore };
