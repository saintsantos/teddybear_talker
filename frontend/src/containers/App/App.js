import React, { Component } from 'react';
import TopNav from '../../components/Navigation/navbar.js';
import Events from '../Events/Events.js';
import Audio from '../Audio/Audio.js';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router'


class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <TopNav />
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Events} />
                        <Route exact path='/audio' component={Audio} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
