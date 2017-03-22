import React, { Component } from 'react';
import { Panel, Button, ListGroup, ListGroupItem, Row, Col, Glyphicon, Jumbotron } from 'react-bootstrap';
import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <Jumbotron>
        <Row className='header'>
          <h1>Tabil Configuration</h1>
        </Row>
        <Panel>
          <Row className='header'>
            <Col sm={5} md={4}>
              <Panel className='connected'>
                <h3>Current Status: Connected</h3>
              </Panel>
            </Col>
            <Col sm={3} md={4} smOffset={6} mdOffset={4}>
              <h3>Bear Time: 6:00pm</h3>
            </Col>
          </Row>
        </Panel>
      </Jumbotron>
    );
  }
}
