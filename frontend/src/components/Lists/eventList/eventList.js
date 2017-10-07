import React , { Component } from 'react';
import PropTypes from 'prop-types';
import EventRow from './eventRow.js';
import { Table } from 'semantic-ui-react';
import { observer } from 'mobx-react';


@observer
class EventList extends Component {
    constructor() {
        super();
    }

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
                    {this.props.events.slice().map((event) => 
                    <EventRow 
                    key={event.id} 
                    event={event}  
                    voice={this.props.audios.get(event.voice)} 
                    jingle={this.props.audios.get(event.jingle)}
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
