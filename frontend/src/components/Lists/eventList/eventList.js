import React , { Component } from 'react';
import PropTypes from 'prop-types';
import EventRow from './eventRow.js';
import { Table } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import shortid from 'shortid';


@observer
class EventList extends Component {
    render() {
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Time</Table.HeaderCell>
                        <Table.HeaderCell>Audio</Table.HeaderCell>
                        <Table.HeaderCell>Jingle</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {Array.from(this.props.events).map((event) => 
                    <EventRow 
                    key={shortid.generate()}
                    event={event}
                    voice={this.props.audios.get(event[1].voice)} 
                    music={this.props.audios.get(event[1].music)}
                    />)}
                </Table.Body>
            </Table>
        )
    }
}

EventList.propTypes = {
    events: PropTypes.any,
    audios: PropTypes.any
}

export default EventList;
