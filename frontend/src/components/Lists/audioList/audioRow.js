import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'semantic-ui-react';
import appStore from '../../../stores/appStore';
import { observer } from 'mobx-react';

@observer
class AudioRow extends Component {
    constructor(props) {
        super(props);
    }

    editSound = (e) => {
        appStore.editElement(this.props.audio.id);
    }
    
    render() {
        //TODO - This won't update on the form save for some reason.
        const audioType = this.props.audio.form ? 'Music' : 'Voice';
        return (
        <Table.Row>
            <Table.Cell>{this.props.audio.getName}</Table.Cell>
            <Table.Cell>{audioType}</Table.Cell>
            <Table.Cell>
                <Button color='teal' onClick={this.editSound}>Edit</Button>
                <Button color='red' onClick={this.deleteSound}>Delete</Button>
            </Table.Cell>
        </Table.Row>  
        )
    }
}

AudioRow.propTypes = {
    audio: PropTypes.object
}

export default AudioRow;
