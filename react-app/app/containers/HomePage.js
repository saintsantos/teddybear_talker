// @flow
import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import EventList from '../components/EventList/EventList.jsx';
import Header from '../components/Header/Header.jsx';
import SideNavbar from '../components/SideNavbar/SideNavbar.js';
import FileModal from '../components/FileModal/FileModal.jsx';

export default class HomePage extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Header />
        </Row>
        <Row>
          <SideNavbar />
        </Row>
      </Grid>
    );
  }
}
