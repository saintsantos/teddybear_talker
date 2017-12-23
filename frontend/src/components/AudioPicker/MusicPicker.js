import React, { Component } from 'react';
import PropTypes from 'prop-types';
import audioStore from '../../stores/audioStore';


class MusicPicker extends Component {
  constructor() {
    super();
    this.state = {
      'musics': []
    }
  }

  componentWillMount() {
    this.getMusics();
  }

  getMusics = (e) => {
    let music = Array.from(audioStore).filter((audio) => {
        return audio[1].form === 1;
    })
    this.setState({musics: music})
  }

  render() {
    return (
      <select label='Voice' value={this.props.music} onChange={this.props.updateFunc}>
        <option value={audioStore.get(1).id}>{audioStore.get(1).name}</option>
        {this.state.musics.map((music) => <option value={music[1].id}>{music[1].name}</option>)} 
      </select>
    )
  }
}

MusicPicker.propTypes = {
  updateFunc: PropTypes.func,
  music: PropTypes.any,
}

export default MusicPicker;
