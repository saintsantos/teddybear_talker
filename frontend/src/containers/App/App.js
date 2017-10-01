import React, { Component } from 'react';
import TopNav from '../../components/Navigation/navbar.js';
import Events from '../Events/Events.js';
import Audio from '../Audio/Audio.js';


class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <TopNav />
            </div>
        )
    }
}

export default App;
