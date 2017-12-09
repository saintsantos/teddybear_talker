import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'semantic-ui-react';
import appStore from '../../../stores/appStore';
import eventStore from '../../../stores/eventStore';
import { observer } from 'mobx-react';
import axios from 'axios';
import moment from 'moment';
import DeleteEventModal from '../../Modal/DeleteEventModal.js';
import Halogen from 'halogen';
import { deleteEvent, testEvent } from '../../../services/http';

@observer
class EventRow extends Component {
    constructor() {
        super();
        this.state = {
            playing: false
        }
    }
   editEvent = (e) => {
       appStore.editElement(this.props.event[1].id)
   }

   deleteEvent = (e) => {
       eventStore.delete(this.props.event[0])
       let deleteResponse = deleteEvent(this.props.event[1].id);
           deleteResponse.then((response) => {
           console.log(response);
           })

   }

   testEvent = (e) => {
       this.setState({playing: true});
       console.log(eventStore.get(this.props.event[1].id))
       let testResponse = testEvent(this.props.event[1].id);
           testResponse.then((response) => {
           console.log(response);
           this.setState({playing: false})
           })
           .catch((error) => {
           console.log(error);
           this.setState({playing: false})
           })
   }

   render() {
       const time = moment(this.props.event[1].time, ["HH:mm"]).format("h:mm a")
       let playButton = null
       if (this.state.playing) {
           playButton = (
            <Button className='disabled' color='blue' onClick={this.testEvent}>
                <div><Halogen.PulseLoader color={'#ffffff'}/></div>
            </Button>
           
        )
       } else {
           playButton = (
            <Button color='blue' onClick={this.testEvent}>
                <div>Play</div>
            </Button>
        )
       }
        return (
            <Table.Row>
                <Table.Cell>{time}</Table.Cell>
                <Table.Cell>{this.props.voice.getName}</Table.Cell>
                <Table.Cell>{this.props.music.getName}</Table.Cell>
                <Table.Cell>
                    <Button color='teal' onClick={this.editEvent}>Edit</Button>
                    <DeleteEventModal deleteEvent={this.deleteEvent}/>
                    {playButton}
                    
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
