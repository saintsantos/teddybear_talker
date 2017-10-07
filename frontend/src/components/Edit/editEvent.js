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
        }
        
    }

    render() {
        return (
            
            <Form onSubmit={console.log("submitting")}>
                <Form.Field>
                    <Header as='h4'>Time</Header>
                    <TimePicker showSecond={false} defaultValue={now} onChange={console.log("updateclock")} format={format} use12Hours></TimePicker>
                </Form.Field>
                <Form.Group>
                    <Form.Field>
                        <select label='Voice' onChange={console.log("Update audio name")}>
                        </select>
                    </Form.Field>
                </Form.Group>
                <Form.Field>
                    <select label='Day'  onChange={console.log("Update day")}>
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