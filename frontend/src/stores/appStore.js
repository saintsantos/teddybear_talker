import { observable, action } from 'mobx';

class AppStore {
    @observable edit;
    @observable editId;
    @observable makeNew;
    @observable day;
    @observable backendurl;
    @observable loading;
    @observable activeTab

    constructor(edit = false, editId = 1, day = 'monday', backendurl = 'http://192.168.8.1/api', loading = true, activeTab = 1) {
        this.edit = edit;
        this.editId = editId;
        this.day = day;
        this.backendurl = backendurl;
        this.loading = loading;
        this.activeTab = activeTab;
    }

    @action editElement = (id) => {
        this.editId = id;
        this.edit = true;
        console.log(this.edit);
    }

    @action closeEdit = () => {
        this.edit = false;
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

    @action navAway = (activeTab) => {
        this.activeTab = activeTab;
    }

    @action loaded = () => {
        this.loading = false;
    }

    @action loadingScreen = () => {
        this.loading = true;
    }
}

const appStore = new AppStore();
export default appStore;
export { AppStore };
