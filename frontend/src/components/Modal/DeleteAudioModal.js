import React from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Image, Modal, Icon } from 'semantic-ui-react';

class DeleteAudioModal extends React.Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false
    }
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })

  handleDelete = () => {
    this.props.deleteAudio();
    this.setState({ modalOpen: false })
  }

  render() {
    return (
      <Modal
      trigger={<Button color='red' onClick={this.handleOpen}>Delete</Button>}
      open={this.state.modalOpen}
      onClose={this.handleClose}
      basic
      size='small'
    >
      <Header icon='trash outline' content='Delete Audio'/>
      <Modal.Content>
        <p>Are you sure you want to delete this audio file?</p>
      </Modal.Content>
      <Modal.Actions>
      <Button color='red' onClick={this.handleClose} inverted>
          <Icon name='remove' /> Cancel
        </Button>
        <Button color='green' onClick={this.handleDelete} inverted>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
    )
  }
}

DeleteAudioModal.propTypes = {
  deleteAudio: PropTypes.func
};

export default DeleteAudioModal;