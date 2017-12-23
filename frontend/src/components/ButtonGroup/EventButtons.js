import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import appStore from '../../stores/appStore';
import eventStore from '../../stores/eventStore';
import DeleteEventModal from '../Modal/DeleteEventModal.js';
import { deleteEvent, testEvent } from '../../services/http';
import Halogen from 'halogen';

class EventButtons extends Component {
  constructor() {
    super();
    this.state = {
      playing: false
    }
  }
  editEvent = (e) => {
    appStore.editElement(this.props.id);

  }

  deleteEvent = (e) => {
    eventStore.delete(this.props.index);
    deleteEvent(this.props.id);
  }

  testEvent = (e) => {
    this.setState({playing: true});
    console.log(eventStore.get(this.props.id));
    testEvent(this.props.id)
    .then((response) => {
      console.log(response);
      this.setState({playing: false});
    })
    .catch((error) => {
      console.log(error);
      this.setState({playing: false});
    })
  }

  render() {
    let playButton = null;
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
      <Button.Group>
        <Button color='teal' onClick={this.editEvent}>Edit</Button>
        <DeleteEventModal deleteEvent={this.deleteEvent}/>
        {playButton}
      </Button.Group>
    )
  }
}

EventButtons.propTypes = {
  id: PropTypes.number,
  index: PropTypes.string,
}

export default EventButtons;