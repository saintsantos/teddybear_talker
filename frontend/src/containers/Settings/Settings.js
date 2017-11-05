import React, { Component } from 'react';
import appStore from '../../stores/appStore';
import { Button, Segment, Grid, Label, Header, Divider } from 'semantic-ui-react';
import axios from 'axios';
import RestartBearModal from '../../components/Modal/RestartBearModal';
import ResetBearModal from '../../components/Modal/ResetBearModal';
import eventStore from '../../stores/eventStore';
import audioStore from '../../stores/audioStore';
import moment from 'moment';

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
        const data = {
            'now': moment().format('ddd MMM D HH:mm:ss YYYY')
        }
        axios.post(appStore.backendurl + '/date', data)
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
                <Header as='h1'>Settings</Header>
                <Divider />
                <Grid.Row>
                    <Header as='h4'>Reboot Tabil</Header>
                    <RestartBearModal restartBear={this.rebootBear}/>
                </Grid.Row>
                <Divider />
                <Grid.Row>
                    <Header as='h4'>Remove all files and Events from Tabil</Header>
                    <ResetBearModal resetBear={this.hardReset}/>
                </Grid.Row>
                <Divider />
                <Grid.Row>
                    <Header as='h4'>Update Date of Tabil</Header>
                    <Button color="teal" onClick={this.updateBearDate}>Update Bear Date</Button>
                </Grid.Row>
            </Segment>

        )

    }
}

export default Settings;
