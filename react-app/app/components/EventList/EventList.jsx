import React, { Component } from 'react';
import { Panel, Button, ListGroup, ListGroupItem, Row, Col, Nav, NavItem, DropdownButton, MenuItem } from 'react-bootstrap';
import EventElement from '../EventElement/EventElement.jsx';
import './EventList.css';

export default class EventList extends Component {
  render() {
    return (
      <Panel>
        <Row>
          <Nav bsStyle='tabs' justified activeKey={1}>
            <NavItem eventKey={1}>Day View</NavItem>
            <NavItem eventKey={2}>Week View</NavItem>
          </Nav>
        </Row>
        <Row>
          <DropdownButton bsStyle="default" title="Day">
            <MenuItem>Monday</MenuItem>
            <MenuItem>Tuesday</MenuItem>
            <MenuItem>Wednesday</MenuItem>
            <MenuItem>Thursday</MenuItem>
            <MenuItem>Friday</MenuItem>
            <MenuItem>Saturday</MenuItem>
            <MenuItem>Sunday</MenuItem>
          </DropdownButton>
        </Row>
        <Row>
          <Panel>
            <ListGroup>
              <EventElement />
              <EventElement />
              <EventElement />
              <EventElement />
            </ListGroup>
          </Panel>
        </Row>
      </Panel>
    )
  }
}
