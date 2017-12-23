import React, { Component } from 'react';
import TopNav from '../../components/Navigation/navbar.js';
import Events from '../Events/Events.js';
import AudioPage from '../Audio/Audio.js';
import Settings from '../Settings/Settings.js';
import appStore from '../../stores/appStore';
import audioStore, { Audio } from '../../stores/audioStore';
import eventStore, { Event } from '../../stores/eventStore';
import { Container } from 'semantic-ui-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import { getAudio, getEvents } from '../../services/http';

class App extends Component {
    render() {
        getAudio()
        getEvents()

        return (
            <Router>
                <Container>
                    <TopNav store={appStore}/>
                    <Route exact path="/" component={Events}/>
                    <Route path="/audio" component={AudioPage}/>
                    <Route path="/settings" component={Settings}/>
                </Container>
            </Router>
        )
    }
}

export default App;
