import React, { Component } from 'react';
import appStore from '../../stores/appStore';
import { Button, Segment } from 'semantic-ui-react';
import axios from 'axios';


class Settings extends Component {
    constructor() {
        super();
    }


    hardReset = (e) => {
        axios.post(appStore.backendurl + '/clean')
            .then((response) => {
                console.log(response);
                alert("Bear successfully reset")
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
                <Button color="orange" onClick={this.rebootBear}>Restart Bear</Button>
                <Button color="red" onClick={this.hardReset}>Reset Bear</Button>
                <Button color="teal" onClick={this.updateBearDate}>Update Bear Date</Button>
            </Segment>

        )

    }
}

export default Settings;
