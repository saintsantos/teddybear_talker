import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import moment from 'moment';
import Halogen from 'halogen';
import EventButtons from '../../ButtonGroup/EventButtons';

@observer
class EventRow extends Component {
    constructor() {
        super();
        this.state = {
            playing: false
        }
    }
   render() {
       const time = moment(this.props.event[1].time, ["HH:mm"]).format("h:mm a")
        return (
            <Table.Row>
                <Table.Cell>{time}</Table.Cell>
                <Table.Cell>{this.props.event[1].voice.name}</Table.Cell>
                <Table.Cell>{this.props.event[1].voice.name}</Table.Cell>
                <Table.Cell>
                    <EventButtons id={this.props.event[1].id} index={this.props.event[0]}/>
                </Table.Cell>
            </Table.Row>
        )
    }
}

EventRow.propTypes = {
    event: PropTypes.array,
}

export default EventRow;
