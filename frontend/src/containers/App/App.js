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

class App extends Component {
    render() {
        axios.get(appStore.backendurl + '/audio/')
            .then((response) => {
                response.data.audio.map((audio) => {
                    audioStore.set(audio.id, new Audio(audio.id, audio.name, audio.form, audio.path));
                })
                axios.get(appStore.backendurl + '/events/' + appStore.day)
                    .then((response) => {
                        response.data.events.map((event) => {
                            eventStore.set(event.id, new Event(event.id, event.time, event.voice, event.music, event.day))
                        })
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error);
            })

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
