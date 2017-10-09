import React, { Component } from 'react';
import { observer } from 'mobx-react';
import appStore from '../../stores/appStore';
import audioStore from '../../stores/audioStore';
import { Segment, Button, Grid, Divider } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import ReactAudioPlayer from 'react-audio-player';

@observer
class NewAudio extends Component {
    constructor() {
        super();
        this.state = {
            accepted: [],
            rejected: [],
            upload: false
        }
    }

    checkUploads = (e) => {
        console.log(this.state.accepted);
        console.log(this.state.rejected);
    }
    clearList = (e) => {
        this.setState({
            accepted: [],
            rejected: []
        })
    }

    render() {
        return (
            <Segment>
                <Grid columns={3} relaxed>
                    <Grid.Column>
                        <Segment basic>
                            <Dropzone
                            accept="audio/*"
                            onDrop={(accepted, rejected) => {this.setState({accepted, rejected});}}
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
                            <li>
                                <p>{file.name}</p>
                            </li>
                            )}
                        </ul>

                    </Grid.Column>
                    <Grid.Column>
                        <Segment basic>
                            <ul>
                                <li><Button onClick={this.checkUploads}>Upload File</Button></li>
                                <li><Button onClick={this.clearList}>Clear uploads</Button></li>
                                <li><Button onClick={appStore.closeNew}>Cancel</Button></li>
                            </ul>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </Segment>
        )
    }
}

export default NewAudio;