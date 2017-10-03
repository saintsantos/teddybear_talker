import React, { Component } from 'react';
import { Form, Header } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import appStore from '../../stores/appStore';
import eventStore from '../../stores/eventStore';
import audioStore from '../../stores/audioStore';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import 'rc-time-picker/assets/index.css';

// TODO - Handle the event and editing system more intelligently.

const days = [
    {key: "Mon", text: "Monday", value: "monday"},
    {key: "Tues", text: "Tuesday", value: "tuesday"},
    {key: "Wed", text: "Wednesday", value: "wednesday"},
    {key: "Thurs", text: "Thursday", value: "thursday"},
    {key: "Fri", text: "Friday", value: "friday"},
    {key: "Sat", text: "Saturday", value: "saturday"},
    {key: "Sun", text: "Sunday", value: "sunday"},
]

const now = moment().hour(0).minute(0);
const format = 'h:mm a'

@observer
class EditEvent extends Component {
    constructor() {
        super();
        this.state = {
            'time': eventStore.events.find(this.findEvent).time,
            'audio': eventStore.events.find(this.findEvent).audio,
            'day': eventStore.events.find(this.findEvent).day
        }
    }

    findEvent = (event) => {
        return event.id === appStore.editId;
    }

    handleAudioChange = (e) => {
        this.setState({audio: e.target.value});
    }

    handleClock = (value) => {
        this.setState({time: value.format('H:mm')})
    }

    handleDayChange = (e) => {
        this.setState({day: e.target.value})
    }

    handleSubmit = (e) => {
        console.log("The form was submitted");
        console.log(e)
        eventStore.updateEvent(appStore.editId, this.state);
        appStore.closeEdit();
    }

    


    render() {
        const jingleOptions = audioStore.audio_files.slice().filter((audio) => {
            return audio.form === 1;
        })
        return (
            
            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                    <Header as='h4'>Time</Header>
                    <TimePicker showSecond={false} defaultValue={now} onChange={this.handleClock} format={format} use12Hours></TimePicker>
                </Form.Field>
                <Form.Group>
                    <Form.Field>
                        <select label='Audio' value={this.state.audio} onChange={this.handleAudioChange}>
                            {jingleOptions.map((option) => <option value={option.id}>{option.name}</option>)}
                        </select>
                    </Form.Field>
                </Form.Group>
                <Form.Field>
                    <select label='Day' value={this.state.day} onChange={this.handleDayChange}>
                        {days.map((day) => <option value={day.value}>{day.text}</option>)}
                    </select>
                </Form.Field>
                <Form.Group>
                    <Form.Button type="submit" value="Submit">Save</Form.Button>
                    <Form.Button onClick={appStore.closeEdit}>Cancel</Form.Button>
                </Form.Group>
            </Form>
        )
    }
}

export default EditEvent;