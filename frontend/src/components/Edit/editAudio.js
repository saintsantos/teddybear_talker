import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import appStore from '../../stores/appStore';
import audioStore from '../../stores/audioStore';
import formStore from '../../stores/formStore';


//TODO - Redo this nonsense
@observer
class EditAudio extends Component {
    constructor() {
        super();
    }

    findAudio = (audio) => {
        return audio.id === appStore.editId;
    }

    saveAndClose = (e, {name}) => {
        console.log(name);
        audioStore.saveAudio()
    }

    handleChange = (e, {name, value}) => {
        console.log(name);
        console.log(value);
    }

    render() {
        return (
            <Form onSubmit={this.saveAndClose}>
                <Form.Input label='Audio name' placeholder={audioStore.audio_files.find(this.findAudio).name}></Form.Input>
                <Form.Group>
                    <Form.Button content='Submit'>Save</Form.Button>
                    <Form.Button onClick={appStore.closeEdit}>Cancel</Form.Button>
                </Form.Group>
            </Form>
        )
    }
}


export default EditAudio;