import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import appStore from '../../stores/appStore';
import audioStore from '../../stores/audioStore';
import axios from 'axios';

const forms = [
    {key: 0, text: "Voice", value: 0},
    {key: 1, text: "Music", value: 1},
]
@observer
class EditAudio extends Component {
    constructor() {
        super();
        this.state = {
            'name': audioStore.get(appStore.editId).name,
            'form': audioStore.get(appStore.editId).form
        }
    }

    componentDidMount() {
        console.log(forms);
    }

    saveAndClose = (e) => {
        axios.patch(appStore.backendurl + '/audio/' + appStore.editId, this.state)
            .then((response) => {
                console.log(response.data);
                audioStore.get(appStore.editId).updateAudio(appStore.editId, this.state.name, this.state.form);
                appStore.closeEdit();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleChange = (e) => {
        this.setState({'name': e.target.value})
    }

    handleFormChange = (e) => {
        this.setState({'form': parseInt(e.target.value)});
    }

    render() {
        return (
            <Form onSubmit={this.saveAndClose}>
                <Form.Input label='Audio name' placeholder={this.state.name} onChange={this.handleChange}></Form.Input>
                <Form.Field>
                    <select label='Type of audio'  value={this.state.form} onChange={this.handleFormChange}>
                        {forms.map((form) => <option value={form.value}>{form.text}</option>)}
                    </select>
                </Form.Field>

                <Form.Group>
                    <Form.Button type='Submit'>Save</Form.Button>
                    <Form.Button onClick={appStore.closeEdit}>Cancel</Form.Button>
                </Form.Group>
            </Form>
        )
    }
}


export default EditAudio;
