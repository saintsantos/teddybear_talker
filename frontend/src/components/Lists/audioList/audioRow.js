import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar, ListGroupItem, Col, Panel } from 'react-bootstrap'

class AudioRow extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Panel header={this.props.audio.name} eventKey={this.props.audio.id}>
                <Col>
                    {this.props.audio.path}
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

AudioRow.propTypes = {
    audio: PropTypes.objectOf(PropTypes.any)
}

export default AudioRow;
