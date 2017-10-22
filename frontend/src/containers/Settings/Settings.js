import React, { Component } from 'react';
import appStore from '../../stores/appStore';
import { Button, Segment } from 'semantic-ui-react';
import axios from 'axios';
import RestartBearModal from '../../components/Modal/RestartBearModal';
import ResetBearModal from '../../components/Modal/ResetBearModal';
import eventStore from '../../stores/eventStore';
import audioStore from '../../stores/audioStore';

class Settings extends Component {
    constructor() {
        super();
    }

    hardReset = (e) => {
        axios.post(appStore.backendurl + '/clean')
            .then((response) => {
                console.log(response);
                alert("Bear successfully reset")
                eventStore.clear();
                audioStore.clear();
            })
            .catch((error) => {
                console.log(error);
                alert("Bear not successfully reset");
            })
    }

    rebootBear = (e) => {
        axios.post(appStore.backendurl + '/reboot')
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    updateBearDate = (e) => {
        axios.post(appStore.backendurl + '/date')
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <Segment>
                <RestartBearModal restartBear={this.rebootBear}/>
                <ResetBearModal resetBear={this.hardReset}/>
                <Button color="teal" onClick={this.updateBearDate}>Update Bear Date</Button>
            </Segment>

        )

    }
}

export default Settings;
