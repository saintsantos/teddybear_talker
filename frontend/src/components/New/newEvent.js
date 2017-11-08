import React, { Component } from 'react';
import { observer } from 'mobx-react';
import appStore from '../../stores/appStore';
import audioStore from '../../stores/audioStore';
import eventStore from '../../stores/eventStore';
import { Event } from '../../stores/eventStore';
import { Segment, Form, Header, Label } from 'semantic-ui-react';
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
            'day': 'monday',
            'musics': [],
            'voices': [],
            'loading': false,
        }
    }

    componentWillMount() {
        this.getMusic();
        this.getVoices();

    }

    createEvent = (e) => {
        //Make http request here
        this.setState({loading: true})
        let data = {
            'time': this.state.time,
            'voice': this.state.voice,
            'music': this.state.music,
            'day': this.state.day
        }
        axios.post(appStore.backendurl + '/events/', data)
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
                this.setState({loading: false});
                
                appStore.closeNew();
            })
            .catch((error) => {
                alert(error.response.data.error)
                this.setState({loading: false});
            })

    }

    getVoices = (e) => {
        let voices = Array.from(audioStore).filter((audio) => {
            return audio[1].form === 0;
        })
        this.setState({voices: voices})
    }

    getMusic = (e) => {
        let music = Array.from(audioStore).filter((audio) => {
            return audio[1].form === 1;
        })
        this.setState({musics: music})
    }

    updateClock = (value) => {
        this.setState({'time': value.format("HH:mm")})
    }

    updateVoice = (e) => {
        this.setState({'voice': e.target.value})
    }

    updateMusic = (e) => {
        this.setState({'music': e.target.value})
    }

    updateDay = (e) => {
        this.setState({'day': e.target.value})
    }

    render() {

        let uploadButton = null;
        if (this.state.loading) {
            uploadButton = (
                <Form.Button className='disabled' type="submit" value="Submit">Save</Form.Button>
            )
        } else {
            uploadButton = (
                <Form.Button type="submit" value="Submit">Save</Form.Button>
            )
        }
        return (
            <Segment>
                <Form onSubmit={this.createEvent}>
                    <Form.Field>
                        <Header as='h4'>Select time of event: </Header>
                        <TimePicker showSecond={false} defaultValue={moment(this.state.time, ["H:mm a"])} onChange={this.updateClock} format={format} use12Hours></TimePicker>
                    </Form.Field>
                    <Form.Group>
                        <Form.Field>
                            <Header as='h4'>Select Voice for event: </Header>
                            <select label='Voice' value={this.state.voice} onChange={this.updateVoice}>
                                <option value={audioStore.get(1).id}>{audioStore.get(1).name}</option>
                                {this.state.voices.map((voice) => <option value={voice[1].id}>{voice[1].name}</option>)}
                            </select>
                        </Form.Field>
                        <Form.Field>
                            <Header as='h4'>Select Music for event: </Header>
                            <select label='music' value={this.state.music} onChange={this.updateMusic}>
                                <option value={audioStore.get(1).id}>{audioStore.get(1).name}</option>
                                {this.state.musics.map((music) => <option value={music[1].id}>{music[1].name}</option>)}
                            </select>
                        </Form.Field>
                    </Form.Group>
                    <Form.Field>
                        <Header as='h4'>Select day of event: </Header>
                        <select label='Day'  value={this.state.day} onChange={this.updateDay}>
                            {days.map((day) => <option key={day.key} value={day.value}>{day.text}</option>)}
                        </select>
                    </Form.Field>
                    <Form.Group>
                        {uploadButton}
                        <Form.Button onClick={appStore.closeNew}>Cancel</Form.Button>
                    </Form.Group>
                </Form>
            </Segment>
        )
    }
}

export default NewEvent;