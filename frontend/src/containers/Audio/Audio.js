import React, { Component } from 'react';
import AudioList from '../../components/Lists/audioList/audioList.js';
import { Button, Segment, Dropdown, Menu } from 'semantic-ui-react';
import EditAudio from '../../components/Edit/editAudio.js';
import audioStore from '../../stores/audioStore';
import appStore from '../../stores/appStore';
import { observer } from 'mobx-react';
import NewAudio from '../../components/New/newAudio.js';
import { getAudio } from '../../services/http';
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
            getAudio();
            this.setState({form: data.value})
        } else {
            getAudio();
            this.setState({form: data.value})
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
                    <h2>Audio Files</h2>
                    <AudioList audios={audioStore}/>
                </Segment>
                {edit}
                {createNew}
            </div>
        )
    }
}

export default AudioPage;
