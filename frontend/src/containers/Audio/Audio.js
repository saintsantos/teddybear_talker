import React, { Component } from 'react';
import AudioList from '../../components/Lists/audioList/audioList.js';
import { Button, Segment, Dropdown, Menu } from 'semantic-ui-react';
import EditAudio from '../../components/Edit/editAudio.js';
import audioStore from '../../stores/audioStore';
import appStore from '../../stores/appStore';
import { Audio } from '../../stores/audioStore';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import NewAudio from '../../components/New/newAudio.js';
import axios from 'axios';
import './Audio.css';

const forms = [
    {key: "Any", text: "Any", value: -1},
    {key: "Music", text: "Music", value: 1},
    {key: "Voice", text: "Voice", value: 0}
]

@observer
class AudioPage extends Component {
    constructor() {
        super();
        this.state = {
            form: -1
        }
    }
    changeForm = (e, data) => {
        if (data.value === -1) {
            axios.get(appStore.backendurl + '/audio/')
                .then((response) => {
                    audioStore.clear();
                    response.data.audio.map((audio) => {
                        audioStore.set(audio.id, new Audio(audio.id, audio.name, audio.form, audio.path));
                    })
                    this.setState({form: data.value})
                })
                .catch((error) => {
                    console.log(error);
                })

        } else {
            axios.get(appStore.backendurl + '/audio/' + data.value)
                .then((response) => {
                    audioStore.clear();
                    response.data.audio.map((audio) => {
                        audioStore.set(audio.id, new Audio(audio.id, audio.name, audio.form, audio.path));
                    })
                    this.setState({form: data.value})
                })
                .catch((error) => {
                    console.log(error);
                })
        }


    }

    render() {
        const edit = appStore.edit
        ? <Segment><EditAudio /></Segment> : false;
        const createNew = appStore.makeNew
        ? <NewAudio /> : false;

        return (
            
            <div>
                <Segment>
                    <Button onClick={appStore.openNew} floated="right">
                        + New Audio File
                    </Button>
                    <AudioList audios={audioStore}/>
                </Segment>
                {edit}
                {createNew}
            </div>
        )
    }
}

export default AudioPage;
