import React, { Component } from 'react';
import EventList from '../../components/Lists/eventList/eventList.js';
import { Button, Segment, Dropdown, Menu, Loader } from 'semantic-ui-react';
import EditEvent from '../../components/Edit/editEvent.js';
import eventStore, { Event } from '../../stores/eventStore.js';
import audioStore from '../../stores/audioStore.js';
import appStore from '../../stores/appStore.js';
import { observer } from 'mobx-react';
import NewEvent from '../../components/New/newEvent.js';
import { getEvents } from '../../services/http';
import DayPicker from '../../components/DayPicker/DayPicker';
import './Events.css';

@observer
class Events extends Component {
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
                    <DayPicker />
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
