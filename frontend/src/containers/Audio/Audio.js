import React, { Component } from 'react';
import AudioList from '../../components/Lists/audioList/audioList.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'antd';
import './Audio.css';

class Audio extends Component {
    render() {
        return (
            <div>
                <Button>
                    + New Audio
                </Button>
                <Button className="pull-left">
                    <Link to='/'>
                        Events
                    </Link>
                </Button>
                <AudioList />
            </div>
        )
    }
}

export default Audio;
