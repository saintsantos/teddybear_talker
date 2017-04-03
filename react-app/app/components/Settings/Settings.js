import styles from './Settings.css';
import React, { Component } from 'react';
import { Link } from 'react-router';

import { FormControl, Panel, Button, ListGroup, ListGroupItem, Row, Col, Nav, NavItem, DropdownButton, MenuItem } from 'react-bootstrap';

//TODO 
	/*
	 * CBT
	 * Restart
	 * Delete All files
	 * Bear name
	 *
	 */

export default class Settings extends Component {
	render() {
    return (
			<div>
				<h1>Settings</h1>
				<h3>Current Bear Time</h3>
			      <Button bsStyle="primary">Sync Current Time</Button>
				<h3>Bear Name</h3>
				
				

				<h3>Delete All Files</h3>
					<Button bsStyle="danger">Delete All</Button>
				<h3>Restart Bear</h3>
					<Button bsStyle="danger">Restart Bear</Button>
			</div>
		);
  }
}
