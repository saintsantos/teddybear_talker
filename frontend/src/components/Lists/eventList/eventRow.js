import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'semantic-ui-react';
import appStore from '../../../stores/appStore';
import eventStore from '../../../stores/eventStore';
import { observer } from 'mobx-react';
import axios from 'axios';
import moment from 'moment';
import DeleteEventModal from '../../Modal/DeleteEventModal.js';

@observer
class EventRow extends Component {
   editEvent = (e) => {
       appStore.editElement(this.props.event[1].id)
   }

   deleteEvent = (e) => {
       eventStore.delete(this.props.event[0])
       axios.delete(appStore.backendurl + '/events/' + this.props.event[1].id)
           .then((response) => {
           console.log(response);
           })

   }

   testEvent = (e) => {
       console.log(eventStore.get(this.props.event[1].id))
       axios.post(appStore.backendurl + '/test/event/' + this.props.event[1].id)
           .then((response) => {
           console.log(response);
           })
           .catch((error) => {
           console.log(error);
           })
   }

   render() {
       const time = moment(this.props.event[1].time, ["HH:mm"]).format("h:mm a")
        return (
            <Table.Row>
                <Table.Cell>{time}</Table.Cell>
                <Table.Cell>{this.props.voice.getName}</Table.Cell>
                <Table.Cell>{this.props.music.getName}</Table.Cell>
                <Table.Cell>
                    <Button color='teal' onClick={this.editEvent}>Edit</Button>
                    <DeleteEventModal deleteEvent={this.deleteEvent}/>
                    <Button color="blue" onClick={this.testEvent}>Play</Button>
                </Table.Cell>
            </Table.Row>
        )
    }
}

EventRow.propTypes = {
    event: PropTypes.array,
    voice: PropTypes.any,
    music: PropTypes.any
}

export default EventRow;
