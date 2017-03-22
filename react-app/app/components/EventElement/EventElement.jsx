import React, { Component } from 'react';
import { Panel, Button, ListGroup, ListGroupItem, Row, Col, Glyphicon } from 'react-bootstrap';
import './EventElement.css';

export default class EventElement extends Component {
    render() {
        return (
            <ListGroupItem header="8am">
                Good Morning!
                <Button className="pull-right" bsStyle="info">
                    <Glyphicon glyph="edit"/>
                </Button>
            </ListGroupItem>
       )
    }
}
