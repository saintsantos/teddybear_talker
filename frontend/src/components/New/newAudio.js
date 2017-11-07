import React, { Component } from 'react';
import { observer } from 'mobx-react';
import appStore from '../../stores/appStore';
import audioStore, { Audio } from '../../stores/audioStore';
import { Segment, Button, Grid, Divider } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios';
import shortid from 'shortid';
import Halogen from 'halogen';

//TODO - Yeah... upload the audio file to the backend

@observer
class NewAudio extends Component {
    constructor() {
        super();
        this.state = {
            accepted: [],
            rejected: [],
            upload: false,
            loading: false,
        }
    }

    checkUploads = (e) => {
        let data = new FormData()
        data.append('file', this.state.accepted[0])
        if (this.state.accepted.length > 0) {
            this.setState({loading: true})
            axios.post(appStore.backendurl + '/audio/', data)
                .then((response) => {
                    console.log(response.data);
                    this.setState({loading: false})
                    audioStore.set(response.data.id, new Audio(response.data.id, response.data.name, response.data.form, response.data.path))
                    appStore.closeNew();
                })
        } else {
            alert("No accepted files have been uploaded");
            this.setState({
                accepted: [],
                rejected: []
            })
        }

    }
    clearList = (e) => {
        this.setState({
            accepted: [],
            rejected: []
        })
    }

    render() {
        let uploadButton = null
        if (this.state.loading) {
            uploadButton = (
                <Button className='disabled' color='green'>
                    <div><Halogen.DotLoader color={'#ffffff'} /></div>
                </Button>
            )
        } else {
            uploadButton = (
                <Button color='green' onClick={this.checkUploads}>Upload File</Button>
            )
        }
        return (
            <Segment>
                <Grid columns={2} relaxed>
                    <Grid.Column>
                        <Segment basic>
                            <Dropzone
                            accept=".wma, .m4a, .mp3, .wav"
                            onDrop={(accepted, rejected) => {this.setState({accepted, rejected});}}
                            maxSize={2097152}
                            >
                            <h2>Click here and select an audio file to upload</h2>
                            </Dropzone>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <h2>Accepted Files:</h2>
                        <ul>
                            {this.state.accepted.map((file) =>
                                <li key={this.state.accepted.indexOf(file.name)}>
                                    {file.name}
                                    <ReactAudioPlayer 
                                    src={file.preview}
                                    controls
                                    >
                                    </ReactAudioPlayer>
                                </li>
                            )}
                        </ul>
                        <Divider></Divider>
                        <h2>Rejected Files:</h2>
                        <ul>
                            {this.state.rejected.map((file) =>
                            <li key={shortid.generate()}>
                                <p color="red">{file.name}</p>
                            </li>
                            )}
                        </ul>

                    </Grid.Column>
                </Grid>
                {uploadButton}
                <Button onClick={this.clearList}>Clear uploads</Button>
                <Button onClick={appStore.closeNew} >Cancel</Button>
            </Segment>
        )
    }
}

export default NewAudio;