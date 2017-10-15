import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'semantic-ui-react';
import appStore from '../../../stores/appStore';
import audioStore from '../../../stores/audioStore';
import { observer } from 'mobx-react';
import axios from 'axios';

@observer
class AudioRow extends Component {
    editSound = (e) => {
        appStore.editElement(this.props.audio[1].id);
    }

    deleteSound = (e) => {
        audioStore.delete(this.props.audio[0])
        axios.delete(appStore.backendurl + '/audio/' + this.props.audio[1].id)
            .then((response) => {
                console.log(response.data);
            })
    }

    testSound = (e) => {
        console.log(audioStore.get(this.props.audio[1].id));
        axios.post(appStore.backendurl + '/test/audio/' + this.props.audio[1].id)
            .then((response) => {
            console.log(response);
            })
            .catch((error) => {
            console.log(error);
            })
    }
    
    render() {
        //TODO - This won't update on the form save for some reason.
        const audioType = this.props.audio[1].form ? 'Music' : 'Voice';
        return (
        <Table.Row>
            <Table.Cell>{this.props.audio[1].getName}</Table.Cell>
            <Table.Cell>{audioType}</Table.Cell>
            <Table.Cell>
                <Button color='teal' onClick={this.editSound}>Edit</Button>
                <Button color='red' onClick={this.deleteSound}>Delete</Button>
                <Button color="blue" onClick={this.testSound}>Play</Button>
            </Table.Cell>
        </Table.Row>  
        )
    }
}

AudioRow.propTypes = {
    audio: PropTypes.array
}

export default AudioRow;
