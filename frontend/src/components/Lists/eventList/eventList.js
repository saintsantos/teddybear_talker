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
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.props.store.events.map((event) => <EventRow key={event.id} event={event} />)}
                </Table.Body>
            </Table>
        )
    }
}

EventList.propTypes = {
    store: PropTypes.any
}

export default EventList;
