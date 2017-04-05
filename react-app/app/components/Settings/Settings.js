import styles from './Settings.css';
import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

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
    // Just a test function to simply call the backend.
    clicked = () => {
        axios.get('http://localhost:3001/api/hi')
        .then(function(result) {
            console.log(result.data);
        })
    }
	render() {
    return (
			<div>
				<h1>Settings</h1>
				<h3>Current Bear Time</h3>
			      <Button bsStyle="primary" onClick={this.clicked}>Sync Current Time</Button>
				<h3>Bear Name</h3>



				<h3>Delete All Files</h3>
					<Button bsStyle="danger">Delete All</Button>
				<h3>Restart Bear</h3>
					<Button bsStyle="danger">Restart Bear</Button>
			</div>
		);
  }
}
