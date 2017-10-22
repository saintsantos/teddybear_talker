import React from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Image, Modal, Icon } from 'semantic-ui-react';

class DeleteEventModal extends React.Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false
    }
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })

  handleDelete = () => {
    this.props.deleteEvent();
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
      <Header icon='trash outline' content='Delete Event'/>
      <Modal.Content>
        <p>Are you sure you want to delete this event?</p>
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

DeleteEventModal.propTypes = {
  deleteEvent: PropTypes.func
};

export default DeleteEventModal;