import { observable, action, computed } from 'mobx';

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
export default audioStore;
export { Audio };
