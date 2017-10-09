import React, { Component } from 'react';
import { observer } from 'mobx-react';
import appStore from '../../stores/appStore';
import audioStore from '../../stores/audioStore';
import eventStore from '../../stores/eventStore';
import { Segment, Button, Form, Header } from 'semantic-ui-react';
import moment from 'moment';
import TimePicker from 'rc-time-picker';

const days = [
    {key: "Mon", text: "Monday", value: "monday"},
    {key: "Tues", text: "Tuesday", value: "tuesday"},
    {key: "Wed", text: "Wednesday", value: "wednesday"},
    {key: "Thurs", text: "Thursday", value: "thursday"},
    {key: "Fri", text: "Friday", value: "friday"},
    {key: "Sat", text: "Saturday", value: "saturday"},
    {key: "Sun", text: "Sunday", value: "sunday"},
]
const now = moment().format("h:mm a")
const format = 'h:mm a'

@observer
class NewEvent extends Component {
    constructor() {
        super();
        this.state = {
            'time': now,
            'voice': 0,
            'jingle': 0,
            'day': 'monday'
        }
    }

    createEvent = (e) => {
        console.log(this.state);
        appStore.closeNew();
    }

    updateClock = (value) => {
        this.setState({'time': value.format("H:mm")})
    }

    updateVoice = (e) => {
        this.setState({'voice': e.target.value})
    }

    updateJingle = (e) => {
        this.setState({'jingle': e.target.value})
    }

    updateDay = (e) => {
        this.setState({'day': e.target.value})
    }

    render() {
        return (
            <Segment>
                <Form onSubmit={this.createEvent}>
                    <Form.Field>
                        <Header as='h4'>Time</Header>
                        <TimePicker showSecond={false} defaultValue={moment(this.state.time, "H:mm")} onChange={this.updateClock} format={format} use12Hours></TimePicker>
                    </Form.Field>
                    <Form.Group>
                        <Form.Field>
                            <select label='Voice' value={this.state.voice} onChange={this.updateVoice}>
                            </select>
                        </Form.Field>
                    </Form.Group>
                    <Form.Field>
                        <select label='Day'  value={this.state.day} onChange={this.updateDay}>
                            {days.map((day) => <option key={day.key} value={day.value}>{day.text}</option>)}
                        </select>
                    </Form.Field>
                    <Form.Group>
                        <Form.Button type="submit" value="Submit">Save</Form.Button>
                        <Form.Button onClick={appStore.closeNew}>Cancel</Form.Button>
                    </Form.Group>
                </Form>
            </Segment>
        )
    }
}

export default NewEvent;