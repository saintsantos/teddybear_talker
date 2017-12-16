import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import appStore from '../../stores/appStore';
import audioStore from '../../stores/audioStore';
import eventStore from '../../stores/eventStore';
import DeleteAudioModal from '../Modal/DeleteAudioModal';
import Halogen from 'halogen';
import { deleteAudio, testAudio } from '../../services/http';

class AudioButtons extends Component {
  constructor() {
    super();
    this.state = {
      playing: false
    }
  }

  editSound = (e) => {
    appStore.editElement(this.props.id);
  }

  deleteSound = (e) => {
    audioStore.delete(this.props.index)
    deleteAudio(this.props.id, this.props.form);
  }

  testSound = (e) => {
    this.setState({playing: true});
    console.log(audioStore.get(this.props.id));
    let testResponse = testAudio(this.props.id);
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
    let playButton = null
    if (this.state.playing) {
        playButton = (
         <Button className='disabled' color='blue' onClick={this.testSound}>
             <div><Halogen.PulseLoader color={'#ffffff'}/></div>
         </Button>
        
     )
    } else {
        playButton = (
         <Button color='blue' onClick={this.testSound}>
             <div>Play</div>
         </Button>
     )
    }
    return (
      <Button.Group>
        <Button color='teal' onClick={this.editSound}>Edit</Button>
        <DeleteAudioModal deleteAudio={this.deleteSound}/>
        {playButton}
      </Button.Group>

    )
  }
}

AudioButtons.propTypes = {
  id: PropTypes.number,
  index: PropTypes.number,
  form: PropTypes.number
}

export default AudioButtons;