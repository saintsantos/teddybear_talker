import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'semantic-ui-react';
import appStore from '../../../stores/appStore';
import audioStore from '../../../stores/audioStore';
import { observer } from 'mobx-react';
import axios from 'axios';
import DeleteAudioModal from '../../Modal/DeleteAudioModal';
import eventStore from '../../../stores/eventStore';
import Halogen from 'halogen';

@observer
class AudioRow extends Component {
    constructor() {
        super();
        this.state = {
            playing: false
        }
    }
    editSound = (e) => {
        appStore.editElement(this.props.audio[1].id);
    }

    deleteSound = (e) => {
        let deleteEvents = [];
        if (this.props.audio[1].form == 1) {
            deleteEvents = Array.from(eventStore).filter((event) => {
                return event[1].music == this.props.audio[1].id;
            })
        }
        else {
            deleteEvents = Array.from(eventStore).filter((event) => {
                console.log("checking event")
                console.log(this.props.audio[1]);
                return event[1].voice == this.props.audio[1].id;
            })
        }
        if (deleteEvents) {
            deleteEvents.map((event) => {
                eventStore.delete(event[0]);
            })
        }
        
        audioStore.delete(this.props.audio[0])
        axios.delete(appStore.backendurl + '/audio/' + this.props.audio[1].id)
            .then((response) => {
                console.log(response.data);
            })
        

    }

    testSound = (e) => {
        this.setState({playing: true});
        console.log(audioStore.get(this.props.audio[1].id));
        axios.post(appStore.backendurl + '/test/audio/' + this.props.audio[1].id)
            .then((response) => {
            console.log(response);
            this.setState({playing: false})
            })
            .catch((error) => {
            console.log(error);
            this.setState({playing: false})
            })
    }
    
    render() {
        const audioType = this.props.audio[1].form ? 'Music' : 'Voice';
        let playButton = null
        if (this.state.playing) {
            playButton = (
             <Button className='disabled' color='blue' onClick={this.testSound}>
                 <div><Halogen.PulseLoader color={'#ffffff'}/></div>
             </Button>
            
         )
        } else {
            playButton = (
             <Button color='blue' onClick={this.testSound}>
                 <div>Play</div>
             </Button>
         )
        }
        return (
        <Table.Row>
            <Table.Cell>{this.props.audio[1].getName}</Table.Cell>
            <Table.Cell>{audioType}</Table.Cell>
            <Table.Cell>
                <Button color='teal' onClick={this.editSound}>Edit</Button>
                <DeleteAudioModal deleteAudio={this.deleteSound}/>
                {playButton}
            </Table.Cell>
        </Table.Row>  
        )
    }
}

AudioRow.propTypes = {
    audio: PropTypes.array
}

export default AudioRow;
