import React, { Component } from 'react';
import EventList from '../../components/Lists/eventList/eventList.js';
import { Button, Segment } from 'semantic-ui-react';
import eventStore from '../../stores/eventStore';
import appStore from '../../stores/appStore';
import EditEvent from '../../components/Edit/editEvent.js';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import './Events.css';

@observer
class Events extends Component {
    constructor() {
        super();
    }
    render() {

        const edit = appStore.edit
        ? <Segment><EditEvent /></Segment> : false;

        return (
            <div>
                <Segment>
                    <Button onClick={eventStore.addEvent}>
                        + New Event
                    </Button>
                    <Button onClick={eventStore.fetchEvents}>
                        Get Events
                    </Button>
                    <EventList store={eventStore}/>
                </Segment>
                {edit}
            </div>
        );
    }
}

export default Events;
