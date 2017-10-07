import React, { Component } from 'react';
import TopNav from '../../components/Navigation/navbar.js';
import Events from '../Events/Events.js';
import AudioPage from '../Audio/Audio.js';
import appStore from '../../stores/appStore';
import { Container } from 'semantic-ui-react';

class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Container>
                <TopNav store={appStore}/>
                <Events />
            </Container>
        )
    }
}

export default App;
