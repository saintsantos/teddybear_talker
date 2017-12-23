import React, { Component } from 'react';
import PropTypes from 'prop-types';
import audioStore from '../../stores/audioStore';


class VoicePicker extends Component {
  constructor() {
    super();
    this.state = {
      'voices': []
    }
  }

  componentWillMount() {
    this.getVoices();
  }

  getVoices = (e) => {
    let voices = Array.from(audioStore).filter((audio) => {
        return audio[1].form === 0;
    })
    this.setState({voices: voices})
  }

  render() {
    return (
      <select label='Voice' value={this.props.voice} onChange={this.props.updateFunc}>
        <option value={audioStore.get(1).id}>{audioStore.get(1).name}</option>
        {this.state.voices.map((voice) => <option value={voice[1].id}>{voice[1].name}</option>)} 
      </select>
    )
  }
}

VoicePicker.propTypes = {
  updateFunc: PropTypes.func,
  voice: PropTypes.any,
}

export default VoicePicker;