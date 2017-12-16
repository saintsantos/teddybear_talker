import React, { Component } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import appStore from '../../stores/appStore.js';
import { getEvents } from '../../services/http';
import { DAYS } from '../constants/constants';

class DayPicker extends Component {
  changeDay = (e, data) => {
    appStore.changeDay(data.value);
    getEvents(appStore.day);
  }
  render() {
    return (
      <Menu compact>
        <Dropdown text={appStore.day} value={appStore.day} options={DAYS} simple item onChange={this.changeDay}/>
      </Menu>
    );
  }

}

export default DayPicker;