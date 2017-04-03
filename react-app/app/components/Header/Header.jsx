import React, { Component } from 'react';
import { PageHeader, Panel, Button, ListGroup, ListGroupItem, Row, Col, Glyphicon, Jumbotron } from 'react-bootstrap';
import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <PageHeader>
        <Row>
          <Col sm={4} md={4}>
            Connection Status
          </Col>
          <Col sm={4} md={1} smOffset={3} mdOffset={7}>
            CBT
          </Col>
        </Row>
      </PageHeader>
    );
  }
}
