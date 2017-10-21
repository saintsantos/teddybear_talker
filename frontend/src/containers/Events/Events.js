import React, { Component } from 'react';
import EventList from '../../components/Lists/eventList/eventList.js';
import { Button, Segment, Dropdown, Menu, Loader } from 'semantic-ui-react';
import EditEvent from '../../components/Edit/editEvent.js';
import eventStore, { Event } from '../../stores/eventStore.js';
import audioStore from '../../stores/audioStore.js';
import appStore from '../../stores/appStore.js';
import { observer } from 'mobx-react';
import NewEvent from '../../components/New/newEvent.js';
import axios from 'axios';
import './Events.css';

const days = [
    {key: "Mon", text: "Monday", value: "monday"},
    {key: "Tues", text: "Tuesday", value: "tuesday"},
    {key: "Wed", text: "Wednesday", value: "wednesday"},
    {key: "Thurs", text: "Thursday", value: "thursday"},
    {key: "Fri", text: "Friday", value: "friday"},
    {key: "Sat", text: "Saturday", value: "saturday"},
    {key: "Sun", text: "Sunday", value: "sunday"},
]

@observer
class Events extends Component {
    changeDay = (e, data) => {
        appStore.changeDay(data.value);
        axios.get(appStore.backendurl + '/events/' + appStore.day)
            .then((response) => {
                console.log(response.data);
                eventStore.clear()
                response.data.events.map((event) => {
                    eventStore.set(event.id, new Event(event.id, event.time, event.voice, event.music, event.day))
                })
            })
            .catch((error) => {
                console.log(error);
            })

    }
    
    render() {
        const edit = appStore.edit
        ? <EditEvent /> : false;
        const createNew = appStore.makeNew
        ? <NewEvent /> : false;

        return (
            <div>
                <Segment>
                    <Button onClick={appStore.openNew} floated="right">
                        + New Event
                    </Button>
                    <Menu compact>
                        <Dropdown text={appStore.day} value={appStore.day} options={days} simple item onChange={this.changeDay}/>
                    </Menu>
                    <h2>All events for {appStore.day}</h2>
                    <EventList events={eventStore} audios={audioStore}/>
                </Segment>
                {edit}
                {createNew}
            </div>
        );
    }
}

export default Events;
