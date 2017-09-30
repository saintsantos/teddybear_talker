import React , { Component } from 'react';
import PropTypes from 'prop-types';
import EventRow from './eventRow.js';
import { ListGroup, PanelGroup, Accordion } from 'react-bootstrap';
import { Table } from 'antd';
import axios from 'axios';



class EventList extends Component {
    constructor() {
        super();
    }

    componentWillReceiveProps(nextProps) {
        console.log("updating...");
    }
    render() {
        return (
            <Table
                columns={this.props.columns}
                dataSource={this.props.data}></Table>
        )
    }
}

EventList.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object),
    data: PropTypes.arrayOf(PropTypes.object)
}

export default EventList;
