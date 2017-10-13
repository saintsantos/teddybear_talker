import { observable, action } from 'mobx';

class AppStore {
    @observable edit;
    @observable editId;
    @observable active;
    @observable makeNew;
    @observable day;

    constructor(edit = false, editId = 1, active = 'Events', day = 'monday') {
        this.edit = edit;
        this.editId = editId;
        this.active = active;
        this.day = day;
    }

    @action editElement = (id) => {
        this.editId = id;
        this.edit = true;
        console.log(this.edit);
    }

    @action closeEdit = () => {
        this.edit = false;
    }

    @action navigate = (active) => {
        this.active = active;
    }

    @action openNew = () => {
        this.makeNew = true;
    }

    @action closeNew = () => {
        this.makeNew = false;
    }

    @action changeDay = (day) => {
        this.day = day;
    }
}

const appStore = new AppStore();
export default appStore;
export { AppStore };