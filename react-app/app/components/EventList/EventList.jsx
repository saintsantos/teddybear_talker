import React, { Component } from 'react';
import { Panel, Button, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import EventElement from '../EventElement/EventElement.jsx';
import './EventList.css';

export default class EventList extends Component {
    render() {
        return (
            <Panel>
                <ListGroup>
                    <EventElement />
                    <EventElement />
                    <EventElement />
                    <EventElement />
                </ListGroup>
            </Panel>
       )
    }
}
