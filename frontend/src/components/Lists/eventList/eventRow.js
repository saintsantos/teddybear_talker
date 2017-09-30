import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar, ListGroupItem, Col, Panel } from 'react-bootstrap'

class EventRow extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <Panel header={this.props.event.time} eventKey={this.props.event.id}>
                <Col>
                    {this.props.event.audio}
                </Col>
                <Col>
                    <ButtonToolbar>
                        <Button bsStyle="info">Edit</Button>
                        <Button bsStyle="danger">Delete</Button>
                    </ButtonToolbar>
                </Col>
            </Panel>
        )
    }
}

EventRow.propTypes = {
    event: PropTypes.objectOf(PropTypes.any)
}

export default EventRow;
