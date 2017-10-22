import React from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Image, Modal, Icon } from 'semantic-ui-react';

class ResetBearModal extends React.Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false
    }
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })

  handleReset = () => {
    this.props.resetBear();
    this.setState({ modalOpen: false })
  }

  render() {
    return (
      <Modal
      trigger={<Button color='red' onClick={this.handleOpen}>Reset Tabil</Button>}
      open={this.state.modalOpen}
      onClose={this.handleClose}
      basic
      size='small'
    >
      <Header icon='warning sign' content='Reset Tabil?'/>
      <Modal.Content>
        <p>Warning! This will delete all audio files and events currently on the bear!</p>
        <p>Are you sure you want to do this?</p>
      </Modal.Content>
      <Modal.Actions>
      <Button color='red' onClick={this.handleClose} inverted>
          <Icon name='remove' /> Cancel
        </Button>
        <Button color='green' onClick={this.handleReset} inverted>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
    )
  }
}

ResetBearModal.propTypes = {
  resetBear: PropTypes.func
};

export default ResetBearModal;