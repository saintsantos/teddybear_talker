import { observable, action, computed } from 'mobx';
import axios from 'axios';

class Audio {
    @observable id;
    @observable name;
    @observable form;
    @observable path;

    constructor(id, name, form, path) {
        this.id = id;
        this.name = name;
        this.form = form;
        this.path = path;
    }

    @computed get getName() {
        return this.name;
    }

    @computed get getForm() {
        return this.getForm;
    }

    @computed get getId() {
        return this.id;
    }

    @action updateAudio(id, name, form) {
        this.name = name;
        this.form = form;
        //Call the backend here
    }

}

const audioStore = observable(new Map());
audioStore.set(1, new Audio(1, "One Jingle", 1, "~/one_jingle.mp3"));
audioStore.set(2, new Audio(2, "Another Jingle", 0, "~/another_jingle.mp3"));
audioStore.set(3, new Audio(3, "A third Jingle", 1, "~/a_third_jingle.mp3"));
export default audioStore;
export { Audio };
