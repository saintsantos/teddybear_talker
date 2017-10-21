import React, { Component } from 'react';
import { observer } from 'mobx-react';
import appStore from '../../stores/appStore';
import audioStore from '../../stores/audioStore';
import eventStore from '../../stores/eventStore';
import { Event } from '../../stores/eventStore';
import { Segment, Form, Header } from 'semantic-ui-react';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import axios from 'axios';

const days = [
    {key: "Mon", text: "Monday", value: "monday"},
    {key: "Tues", text: "Tuesday", value: "tuesday"},
    {key: "Wed", text: "Wednesday", value: "wednesday"},
    {key: "Thurs", text: "Thursday", value: "thursday"},
    {key: "Fri", text: "Friday", value: "friday"},
    {key: "Sat", text: "Saturday", value: "saturday"},
    {key: "Sun", text: "Sunday", value: "sunday"},
]
const now = moment().format("HH:mm")
const format = 'h:mm a'

// TODO - Figure out a sane way to handle times
@observer
class NewEvent extends Component {
    constructor() {
        super();
        this.state = {
            'time': now,
            'voice': 1,
            'music': 1,
            'day': 'monday'
        }
    }

    createEvent = (e) => {
        //Make http request here
        axios.post(appStore.backendurl + '/events/', this.state)
            .then((response) => {
                if (this.state.day === appStore.day) {
                    eventStore.set(response.data.id,
                        new Event(
                            response.data.id,
                            this.state.time,
                            this.state.voice,
                            this.state.music,
                            this.state.day
                        )
                    )
                }
                
                appStore.closeNew();
            })
            .catch((error) => {
                console.log(error);
            })

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

    updateClock = (value) => {
        this.setState({'time': value.format("HH:mm")})
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
                        <TimePicker showSecond={false} defaultValue={moment(this.state.time, ["H:mm a"])} onChange={this.updateClock} format={format} use12Hours></TimePicker>
                    </Form.Field>
                    <Form.Group>
                        <Form.Field>
                            <select label='Voice' value={this.state.voice} onChange={this.updateVoice}>
                                <option value={audioStore.get(1).id}>{audioStore.get(1).name}</option>
                                {this.getVoices().map((voice) => <option value={voice.id}>{voice.name}</option>)}
                            </select>
                            <select label='Jingle' value={this.state.jingle} onChange={this.updateJingle}>
                                <option value={audioStore.get(1).id}>{audioStore.get(1).name}</option>
                                {this.getJingles().map((jingle) => <option value={jingle.id}>{jingle.name}</option>)}
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