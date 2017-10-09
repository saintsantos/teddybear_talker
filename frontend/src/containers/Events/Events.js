import React, { Component } from 'react';
import EventList from '../../components/Lists/eventList/eventList.js';
import { Button, Segment } from 'semantic-ui-react';
import EditEvent from '../../components/Edit/editEvent.js';
import eventStore from '../../stores/eventStore.js';
import { Event } from '../../stores/eventStore.js';
import { action } from 'mobx';
import audioStore from '../../stores/audioStore.js';
import appStore from '../../stores/appStore.js';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import NewEvent from '../../components/New/newEvent.js';
import './Events.css';

@observer
class Events extends Component {
    constructor() {
        super();
    }
    
    render() {
        const edit = appStore.edit
        ? <Segment><EditEvent /></Segment> : false;
        const createNew = appStore.makeNew
        ? <NewEvent /> : false;

        return (
            <div>
                <Segment>
                    <Button onClick={appStore.openNew}>
                        + New Event
                    </Button>
                    <Button >
                        Get Events
                    </Button>
                    <EventList events={eventStore} audios={audioStore}/>
                </Segment>
                {edit}
                {createNew}
            </div>
        );
    }
}

export default Events;
