import React, { Component } from 'react';
import EventList from '../../components/Lists/eventList/eventList.js';
import { Button, Segment } from 'semantic-ui-react';
import EditEvent from '../../components/Edit/editEvent.js';
import eventStore from '../../stores/eventStore.js';
import { Event } from '../../stores/eventStore.js';
import { action } from 'mobx';
import audioStore from '../../stores/audioStore.js';
import { Link } from 'react-router-dom';
import './Events.css';

class Events extends Component {
    constructor() {
        super();
    }

    @action addEvent() {
        let id = eventStore.peek().length + 1
        eventStore.push(new Event(id, "11:00", 1, 1, "monday"));
    }
    render() {
        return (
            <div>
                <Segment>
                    <Button onClick={this.addEvent}>
                        + New Event
                    </Button>
                    <Button >
                        Get Events
                    </Button>
                    <EventList events={eventStore} audios={audioStore}/>
                </Segment>
            </div>
        );
    }
}

export default Events;
