import { observable } from 'mobx';

class EventStore {
    @observable events;

    constructor(events = []) {
        this.events = events;
    }
}

const eventStore = new EventStore();
export default eventStore;
export { EventStore };
