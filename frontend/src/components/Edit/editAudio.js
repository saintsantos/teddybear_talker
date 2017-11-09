import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import appStore from '../../stores/appStore';
import audioStore from '../../stores/audioStore';
import axios from 'axios';
import Halogen from 'halogen';

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
            'form': audioStore.get(appStore.editId).form,
            'loading': false
        }
    }

    componentDidMount() {
        console.log(forms);
    }

    saveAndClose = (e) => {
        this.setState({loading: true});
        let data = {
            'name': this.state.name,
            'form': this.state.form
        }
        axios.patch(appStore.backendurl + '/audio/' + appStore.editId, data)
            .then((response) => {
                console.log(response.data);
                audioStore.get(appStore.editId).updateAudio(appStore.editId, this.state.name, this.state.form);
                this.setState({loading: false});
                appStore.closeEdit();
            })
            .catch((error) => {
                this.setState({loading: false});
                alert(error.response.data.error);
            })
    }

    handleChange = (e) => {
        this.setState({'name': e.target.value})
    }

    handleFormChange = (e) => {
        this.setState({'form': parseInt(e.target.value)});
    }

    render() {
        let saveButton = null;
        if (this.state.loading) {
            saveButton = (
                <Form.Button className='disabled' color='green' type='Submit'>
                    <div><Halogen.DotLoader color={'#ffffff'} /></div>
                </Form.Button>
            )
        } else {
            saveButton = (
                <Form.Button color='green' type='Submit'>Save</Form.Button>
            )
        }
        return (
            <Form onSubmit={this.saveAndClose}>
                <Form.Input label='Audio name' placeholder={this.state.name} onChange={this.handleChange}></Form.Input>
                <Form.Field>
                    <select label='Type of audio'  value={this.state.form} onChange={this.handleFormChange}>
                        {forms.map((form) => <option value={form.value}>{form.text}</option>)}
                    </select>
                </Form.Field>

                <Form.Group>
                    {saveButton}
                    <Form.Button onClick={appStore.closeEdit}>Cancel</Form.Button>
                </Form.Group>
            </Form>
        )
    }
}


export default EditAudio;
