import React , { Component } from 'react';
import PropTypes from 'prop-types';
import AudioRow from './audioRow.js';
import { Table } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import shortid from 'shortid';

@observer
class AudioList extends Component {
    render() {
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {Array.from(this.props.audios).map((audio) => <AudioRow key={shortid.generate()} audio={audio} />)}
                </Table.Body>
            </Table>
        )
    }
}

AudioList.propTypes = {
    audios: PropTypes.any
}

export default AudioList;
