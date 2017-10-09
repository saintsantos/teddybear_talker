import { observable, action } from 'mobx';

class AppStore {
    @observable edit;
    @observable editId;
    @observable active;
    @observable makeNew;

    constructor(edit = false, editId = 1, active = 'Events') {
        this.edit = edit;
        this.editId = editId;
        this.active = active;
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
}

const appStore = new AppStore();
export default appStore;
export { AppStore };