import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'semantic-ui-react';
import appStore from '../../../stores/appStore';
import { observer } from 'mobx-react';
import moment from 'moment';

@observer
class EventRow extends Component {
    constructor(props) {
        super(props);
    }

   editEvent = (e) => {
       appStore.editElement(this.props.event.id)
   }

   render() {
        return (
            <Table.Row>
                <Table.Cell>{this.props.event.time}</Table.Cell>
                <Table.Cell>{this.props.voice.getName}</Table.Cell>
                <Table.Cell>{this.props.jingle.getName}</Table.Cell>
                <Table.Cell>
                    <Button color='teal' onClick={this.editEvent}>Edit</Button>
                    <Button color='red' onClick={this.deleteEvent}>Delete</Button>
                </Table.Cell>
            </Table.Row>
        )
    }
}

EventRow.propTypes = {
    event: PropTypes.any,
    voice: PropTypes.any,
    jingle: PropTypes.any
}

export default EventRow;
