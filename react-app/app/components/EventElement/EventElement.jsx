import React, { Component } from 'react';
import { Panel, Button, ListGroup, ListGroupItem, Row, Col, Table } from 'react-bootstrap';
import './EventElement.jsx';

export default class EventElement extends Component {
    render() {
        return (
            <Panel>
                <Table bordered>
                    <thead>
                        <th>Time</th>
                        <th>Saying</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>8am</td>
                            <td>Good Morning</td>
                        </tr>
                    </tbody>
                </Table>
            </Panel>
        )
    }
}
