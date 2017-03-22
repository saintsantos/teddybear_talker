// @flow
import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import EventList from '../components/EventList/EventList.jsx';
import Header from '../components/Header/Header.jsx';
import Navbar from '../components/Navbar/Navbar.js';

export default class HomePage extends Component {
  render() {
    return (
        <Grid>
            <Row>
                <Header />
            </Row>
            <Row>
                <Col sm={2} md={2}>
                    <Navbar />
                </Col>
                <Col sm={7} md={7} smOffset={2} mdOffset={2}>
                    <EventList />
                </Col>
            </Row>
        </Grid>
    );
  }
}
