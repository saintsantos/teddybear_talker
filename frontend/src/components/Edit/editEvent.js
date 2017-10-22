import React, { Component } from 'react';
import { Form, Header, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import appStore from '../../stores/appStore';
import eventStore from '../../stores/eventStore';
import audioStore from '../../stores/audioStore';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import 'rc-time-picker/assets/index.css';
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

const format = 'h:mm a'

@observer
class EditEvent extends Component {
    constructor() {
        super();
        this.state = {
            'time': eventStore.get(appStore.editId).time,
            'voice': eventStore.get(appStore.editId).voice,
            'music': eventStore.get(appStore.editId).music,
            'day': eventStore.get(appStore.editId).day
        }
        
    }

    updateClock = (value) => {
        this.setState({'time': value.format("H:mm")})
    }

    updateVoice = (e) => {
        this.setState({'voice': e.target.value})
    }

    updateMusic = (e) => {
        this.setState({'music': e.target.value})
    }

    getVoices = (e) => {
        let voices = []
        Array.from(audioStore).map((audio) => {
            if (audio[1].form === 1) {
                voices.push(audio[1])
            }
        })

        return voices;

    }

    getMusics = (e) => {
        let musics = []
        Array.from(audioStore).map((audio) => {
            if (audio[1].form === 0) {
                musics.push(audio[1])
            }
        })

        return musics;
    }

    updateDay = (e) => {
        this.setState({'day': e.target.value})
    }

    updateEvent = (e) => {
        axios.patch(appStore.backendurl + '/events/' + appStore.editId, this.state)
            .then((response) => {
                console.log(response.data);
                eventStore.get(appStore.editId).updateEvent(appStore.editId, this.state.time, this.state.voice, this.state.music, this.state.day);
                appStore.closeEdit();
            })
            .catch((error) => {
                console.log(error);
            })

    }

    render() {
        const voices = this.getVoices();
        const musics = this.getMusics();
        return (
            <Segment>
                <Form onSubmit={this.updateEvent}>
                    <Form.Field>
                        <Header as='h4'>Select time of event: </Header>
                        <TimePicker showSecond={false} defaultValue={moment(this.state.time, "H:mm")} onChange={this.updateClock} format={format} use12Hours></TimePicker>
                    </Form.Field>
                    <Form.Group>
                        <Form.Field widths="equal">
                            <Header as='h4'>Select Voice for event: </Header>
                            <select label='Voice' value={this.state.voice} onChange={this.updateVoice}>
                                <option value={audioStore.get(1).id}>{audioStore.get(1).name}</option>
                                {voices.map((voice) => <option value={voice.id}>{voice.name}</option>)}
                            </select>
                        </Form.Field>
                        <Form.Field widths="equal">
                            <Header as='h4'>Select Music for event: </Header>
                            <select label='Jingle' value={this.state.music} onChange={this.updateMusic}>
                                <option value={audioStore.get(1).id}>{audioStore.get(1).name}</option>
                                {musics.map((music) => <option value={music.id}>{music.name}</option>)}
                            </select>
                        </Form.Field>
                    </Form.Group>
                    <Form.Field>
                        <Header as='h4'>Select day of event: </Header>
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