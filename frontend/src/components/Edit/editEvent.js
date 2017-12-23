import React, { Component } from 'react';
import { Form, Header, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import appStore from '../../stores/appStore';
import eventStore from '../../stores/eventStore';
import audioStore from '../../stores/audioStore';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import 'rc-time-picker/assets/index.css';
import Halogen from 'halogen';
import { updateEvent } from '../../services/http';
import { DAYS } from '../constants/constants';
import VoicePicker from '../AudioPicker/VoicePicker';
import MusicPicker from '../AudioPicker/MusicPicker';

const format = 'h:mm a'

@observer
class EditEvent extends Component {
    constructor() {
        super();
        this.state = {
            'time': eventStore.get(appStore.editId).time,
            'voice': eventStore.get(appStore.editId).voice,
            'music': eventStore.get(appStore.editId).music,
            'day': eventStore.get(appStore.editId).day,
            'voices': [],
            'musics': [],
            'loading': false
        }
        
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

    getVoices = (e) => {
        let voices = Array.from(audioStore).filter((audio) => {
            return audio[1].form === 0;
        })
        this.setState({voices: voices})


    }

    updateEvent = (e) => {
        // Handle the data for this
        let data = {
            'time': this.state.time,
            'voice': this.state.voice,
            'music': this.state.music,
            'day': this.state.day
        }
        this.setState({loading: true});
        let updatePromise = updateEvent(appStore.editId, data);
            updatePromise.then((response) => {
                console.log(response.data);
                eventStore.get(appStore.editId).updateEvent(appStore.editId, this.state.time, this.state.voice, this.state.music, this.state.day);
                this.setState({loading: false});
                appStore.closeEdit();
            })
            .catch((error) => {
                console.log(error);
                this.setState({loading: false});
                alert(error.response.data.error);
            })

    }

    render() {
        let saveButton = null;
        if (this.state.loading) {
            saveButton = (
                <Form.Button className='disabled' color='green' type="submit" value="Submit">
                    <div><Halogen.DotLoader color={'#ffffff'}/></div>
                </Form.Button>
            )
        } else {
            saveButton = (
                <Form.Button color='green' type="submit" value="Submit">Save</Form.Button>
            )
        }
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
                            <VoicePicker updateFunc={this.updateVoice} voice={this.state.voice} />
                            {/* <select label='Voice' value={this.state.voice} onChange={this.updateVoice}>
                                <option value={audioStore.get(1).id}>{audioStore.get(1).name}</option>
                                {this.state.voices.map((voice) => <option value={voice[1].id}>{voice[1].name}</option>)}
                            </select> */}
                        </Form.Field>
                        <Form.Field widths="equal">
                            <Header as='h4'>Select Music for event: </Header>
                            <MusicPicker updateFunc={this.updateMusic} music={this.state.music} />
                            {/* <select label='Jingle' value={this.state.music} onChange={this.updateMusic}>
                                <option value={audioStore.get(1).id}>{audioStore.get(1).name}</option>
                                {this.state.musics.map((music) => <option value={music[1].id}>{music[1].name}</option>)}
                            </select> */}
                        </Form.Field>
                    </Form.Group>
                    <Form.Field>
                        <Header as='h4'>Select day of event: </Header>
                        <select label='Day'  value={this.state.day} onChange={this.updateDay}>
                            {DAYS.map((day) => <option value={day.value}>{day.text}</option>)}
                        </select>
                    </Form.Field>
                    <Form.Group>
                        {saveButton}
                        <Form.Button onClick={appStore.closeEdit}>Cancel</Form.Button>
                    </Form.Group>
                </Form>
            </Segment>
        )
    }
}

export default EditEvent;