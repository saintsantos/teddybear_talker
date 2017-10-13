import React, { Component } from 'react';
import { Form, Header, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import appStore from '../../stores/appStore';
import eventStore from '../../stores/eventStore';
import audioStore from '../../stores/audioStore';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import 'rc-time-picker/assets/index.css';


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
            'time': eventStore.get(appStore.editId).time,
            'voice': eventStore.get(appStore.editId).voice,
            'jingle': eventStore.get(appStore.editId).jingle,
            'day': eventStore.get(appStore.editId).day
        }
        
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

    getVoices = (e) => {
        let voices = []
        Array.from(audioStore).map((audio) => {
            if (audio[1].form === 1) {
                voices.push(audio[1])
            }
        })

        console.log(voices);
        return voices;

    }

    getJingles = (e) => {
        let jingles = []
        Array.from(audioStore).map((audio) => {
            if (audio[1].form === 0) {
                jingles.push(audio[1])
            }
        })

        console.log(jingles);
        return jingles;
    }

    updateDay = (e) => {
        this.setState({'day': e.target.value})
    }

    updateEvent = (e) => {
        console.log(this.state);
        eventStore.get(appStore.editId).updateEvent(appStore.editId, this.state.time, this.state.voice, this.state.jingle, this.state.day);
        appStore.closeEdit();
    }

    render() {
        const voices = this.getVoices();
        const jingles = this.getJingles();
        return (
            <Segment>
                <Form onSubmit={this.updateEvent}>
                    <Form.Field>
                        <Header as='h4'>Time</Header>
                        <TimePicker showSecond={false} defaultValue={moment(this.state.time, "H:mm")} onChange={this.updateClock} format={format} use12Hours></TimePicker>
                    </Form.Field>
                    <Form.Group>
                        <Form.Field widths="equal">
                            <select label='Voice' value={this.state.voice} onChange={this.updateVoice}>
                                <option value={audioStore.get(0).id}>{audioStore.get(0).name}</option>
                                {voices.map((voice) => <option value={voice.id}>{voice.name}</option>)}
                            </select>
                            <select label='Jingle' value={this.state.jingle} onChange={this.updateJingle}>
                                <option value={audioStore.get(0).id}>{audioStore.get(0).name}</option>
                                {jingles.map((jingle) => <option value={jingle.id}>{jingle.name}</option>)}
                            </select>
                        </Form.Field>
                    </Form.Group>
                    <Form.Field>
                        <select label='Day'  value={this.state.day} onChange={this.updateDay}>
                            {days.map((day) => <option value={day.value}>{day.text}</option>)}
                        </select>
                    </Form.Field>
                    <Form.Group>
                        <Form.Button type="submit" value="Submit">Save</Form.Button>
                        <Form.Button onClick={appStore.closeEdit}>Cancel</Form.Button>
                    </Form.Group>
                </Form>
            </Segment>
        )
    }
}

export default EditEvent;