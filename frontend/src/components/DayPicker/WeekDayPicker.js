import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DAYS } from '../constants/constants';

class WeekDayPicker extends Component {
  render() {
    return (
      <select label='Day'  value={this.props.day} onChange={this.props.updateFunc}>
        {DAYS.map((day) => <option value={day.value}>{day.text}</option>)}
      </select>
    )
  }
}

WeekDayPicker.propTypes = {
  updateFunc: PropTypes.func,
  day: PropTypes.string
}

export default WeekDayPicker;