import React , { Component } from 'react';
import AudioRow from './audioRow.js';
import { ListGroup, PanelGroup, Accordion } from 'react-bootstrap';
import { Table, Button } from 'antd';

const demoAudio = [{
    id: 1,
    name: "One Jingle",
    path: "~/one_jingle.mp3"
}, {
    id: 2,
    name: "Another Jingle",
    path: "~/another_jingle.mp3"
}, {
    id: 3,
    name: "A third jingle",
    path: "~/a_third_jingle.mp3"
}]

const columns = [
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'File Path',
        dataIndex: 'path',
        key: 'path'
    }
]

class AudioList extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Table
                columns={columns}
                expandedRowRender={
                    test => <Button>Test Button</Button>
                }
                dataSource={demoAudio}></Table>
        )
    }
}

export default AudioList;
