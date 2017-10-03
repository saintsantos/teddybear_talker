import React, { Component } from 'react';
import AudioList from '../../components/Lists/audioList/audioList.js';
import { Button, Container, Segment } from 'semantic-ui-react';
import audioStore from '../../stores/audioStore';
import appStore from '../../stores/appStore';
import EditAudio from '../../components/Edit/editAudio.js';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import './Audio.css';

@observer
class Audio extends Component {
    render() {
        const editing = appStore.edit
        ? <Segment><EditAudio /></Segment> : false;
        return (
            <div>
                <Segment>
                    <Button onClick={audioStore.addAudio}>
                        + New Audio File
                    </Button>
                    <AudioList store={audioStore}/>
                </Segment>
                {editing}
            </div>
        )
    }
}

export default Audio;
