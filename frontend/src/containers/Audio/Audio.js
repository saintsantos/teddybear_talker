import React, { Component } from 'react';
import AudioList from '../../components/Lists/audioList/audioList.js';
import { Button, Container, Segment } from 'semantic-ui-react';
import EditAudio from '../../components/Edit/editAudio.js';
import audioStore from '../../stores/audioStore';
import appStore from '../../stores/appStore';
import { Audio } from '../../stores/audioStore';
import { action } from 'mobx';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import NewAudio from '../../components/New/newAudio.js';
import './Audio.css';

@observer
class AudioPage extends Component {
    constructor() {
        super();
    }
    @action addAudio() {
        audioStore.set(audioStore.size + 1, new Audio(audioStore.size + 1, "A new Jingle", 1, "~/a_new_jingle.mp3"))
    }
    render() {
        const edit = appStore.edit
        ? <Segment><EditAudio /></Segment> : false;
        const createNew = appStore.makeNew
        ? <NewAudio /> : false;

        return (
            
            <div>
                <Segment>
                    <Button onClick={appStore.openNew}>
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
