import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'semantic-ui-react';
import appStore from '../../../stores/appStore';
import audioStore from '../../../stores/audioStore';

class AudioRow extends Component {
    constructor(props) {
        super(props);
    }

    editSound = (e) => {
        appStore.editElement(this.props.audio.id);
    }

    deleteSound = (e) => {
        audioStore.deleteAudio(this.props.audio);

    }
    render() {
        return (
        <Table.Row>
            <Table.Cell>{this.props.audio.name}</Table.Cell>
            <Table.Cell>
                <Button color='teal' onClick={this.editSound}>Edit</Button>
                <Button color='red' onClick={this.deleteSound}>Delete</Button>
            </Table.Cell>
        </Table.Row>  
        )
    }
}

AudioRow.propTypes = {
    audio: PropTypes.objectOf(PropTypes.any)
}

export default AudioRow;
