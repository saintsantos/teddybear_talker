import React, { Component } from 'react';
import EventList from '../../components/Lists/eventList/eventList.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../../logo.svg';
import { Button } from 'antd';
import './Events.css';

const demoEvent = [{
    id: 1,
    time: "10:34",
    audio: 1,
}, {
    id: 2,
    time: "11:15",
    audio: 1
}, {
    id: 3,
    time: "12:30",
    audio: 3
}]

const columns = [
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time'
    },
    {
        title: 'Audio File',
        dataIndex: 'audio',
        key: 'audio'
    }
]

class Events extends Component {
    constructor() {
        super();
        this.state = {
            editing: false
        }
        this.getEvents = this.getEvents.bind(this);
        this.addEvent = this.addEvent.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
    }

    toggleEdit() {
        this.setState((prevState) => {
            return {editing: !prevState.editing}
        });
    }


    getEvents() {
        axios.get('http://localhost:5000/events/monday').then(res => {
            console.log(res.data.events);
        }).catch(error => {
            console.log(error);
        })
    }

    // addEvent() {
    //     axios.post('http://localhost:5000/events/', {
    //         time: "11:00",
    //         voice: 0,
    //         jingle: 0,
    //         day: "monday",
    //         status: "active"
    //     }).then(res => {
    //         console.log(res);
    //         demoEvent.push(res.data);
    //     }).catch(error => {
    //         console.log(error);
    //     })
    // }

    addEvent() {
        let newEvent = {
            time: "11:00",
            voice: 0,
            jingle: 0,
            day: "monday",
            status: "active"
        };
        demoEvent.push(newEvent);
        //console.log(demoEvent)
    }

    render() {

        const edit = this.state.editing
        ? <h2>Editing</h2> : false;

        return (
            <div>
                <Button onClick={this.addEvent}>
                    + New Event
                </Button>
                <Button onClick={this.getEvents}>
                    Get Events
                </Button>
                <Button onClick={this.toggleEdit}>
                    Edit
                </Button>
                <div>
                    {edit}
                </div>
                <Button className="pull-left">
                    <Link to='/audio'>
                        Audio
                    </Link>
                </Button>
                <EventList columns={columns} data={demoEvent}/>
            </div>
        );
    }
}

export default Events;
