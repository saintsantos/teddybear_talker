import React, { Component } from 'react';
import EventList from '../../components/Lists/eventList/eventList.js';
import { Button, Segment, Dropdown, Menu } from 'semantic-ui-react';
import EditEvent from '../../components/Edit/editEvent.js';
import eventStore from '../../stores/eventStore.js';
import audioStore from '../../stores/audioStore.js';
import appStore from '../../stores/appStore.js';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import NewEvent from '../../components/New/newEvent.js';
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
    constructor() {
        super();
    }

    changeDay = (e, data) => {
        appStore.changeDay(data.value);
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
                    <EventList events={eventStore} audios={audioStore}/>
                </Segment>
                {edit}
                {createNew}
            </div>
        );
    }
}

export default Events;
