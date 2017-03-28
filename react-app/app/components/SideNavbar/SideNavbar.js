import styles from './SideNavbar.css';
import React, { Component } from 'react';
import { Link } from 'react-router';

import EventList from '../EventList/EventList.jsx';
import Settings from '../Settings/Settings.js';

import { Navbar, Tab, NavDropdown, Panel, Button, ListGroup, ListGroupItem, Row, Col, Nav, NavItem, DropdownButton, MenuItem } from 'react-bootstrap';

//TODO - Fix

export default class SideNavbar extends Component {
  render() {
    return (
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row className="clearfix">
          <Col sm={4}>
            <Nav bsStyle="pills" stacked>
              <NavItem eventKey="first">
                Current Events
              </NavItem>
              <NavItem eventKey="second">
                Uploads
							</NavItem>
              <NavItem eventKey="third">
								Settings
              </NavItem>
            </Nav>
          </Col>
          <Col sm={8}>
            <Tab.Content animation>
              
							<Tab.Pane eventKey="first">
                <EventList />
              </Tab.Pane>
              
							<Tab.Pane eventKey="second">
                Upload a file WIP
              </Tab.Pane>
							
							<Tab.Pane eventKey="third">
								<Settings />
              </Tab.Pane>

            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}
