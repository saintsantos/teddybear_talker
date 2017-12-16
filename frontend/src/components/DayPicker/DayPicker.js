import React, { Component } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import appStore from '../../stores/appStore.js';
import { getEvents } from '../../services/http';

const days = [
  {key: "Mon", text: "Monday", value: "monday"},
  {key: "Tues", text: "Tuesday", value: "tuesday"},
  {key: "Wed", text: "Wednesday", value: "wednesday"},
  {key: "Thurs", text: "Thursday", value: "thursday"},
  {key: "Fri", text: "Friday", value: "friday"},
  {key: "Sat", text: "Saturday", value: "saturday"},
  {key: "Sun", text: "Sunday", value: "sunday"},
]


class DayPicker extends Component {
  changeDay = (e, data) => {
    appStore.changeDay(data.value);
    getEvents(appStore.day);
  }
  render() {
    return (
      <Menu compact>
        <Dropdown text={appStore.day} value={appStore.day} options={days} simple item onChange={this.changeDay}/>
      </Menu>
    );
  }

}

export default DayPicker;