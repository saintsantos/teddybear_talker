import React, { Component } from 'react';
import { Modal, Button,  } from 'react-bootstrap';
import './FileModal.css';

export default class FileModal extends Component {
    render() {
        return (
            <div>
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Upload Files</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Choose a file to upload
                    </Modal.Body>
                    <Modal.Footer>
                        <Button>Cancel</Button>
                        <Button bsStyle='primary'>Upload</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
       )
    }
}
