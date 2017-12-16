import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import Halogen from 'halogen';
import AudioButtons from '../../ButtonGroup/AudioButtons';

@observer
class AudioRow extends Component {
    constructor() {
        super();
        this.state = {
            playing: false
        }
    }
    render() {
        const audioType = this.props.audio[1].form ? 'Music' : 'Voice';
        return (
        <Table.Row>
            <Table.Cell>{this.props.audio[1].getName}</Table.Cell>
            <Table.Cell>{audioType}</Table.Cell>
            <Table.Cell>
                <AudioButtons 
                id={this.props.audio[1].id} 
                index={this.props.audio[0]}
                form={this.props.audio[1].form}
                />

            </Table.Cell>
        </Table.Row>  
        )
    }
}

AudioRow.propTypes = {
    audio: PropTypes.array
}

export default AudioRow;
