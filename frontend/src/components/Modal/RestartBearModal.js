import React from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Image, Modal, Icon } from 'semantic-ui-react';

class RestartBearModal extends React.Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false
    }
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })

  handleRestart = () => {
    this.props.restartBear();
    this.setState({ modalOpen: false })
  }

  render() {
    return (
      <Modal
      trigger={<Button color='orange' onClick={this.handleOpen}>Restart Tabil</Button>}
      open={this.state.modalOpen}
      onClose={this.handleClose}
      basic
      size='small'
    >
      <Header icon='refresh' content='Restart the Bear?'/>
      <Modal.Content>
        <p>This will restart the bear</p>
      </Modal.Content>
      <Modal.Actions>
      <Button color='red' onClick={this.handleClose} inverted>
          <Icon name='remove' /> Cancel
        </Button>
        <Button color='green' onClick={this.handleRestart} inverted>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
    )
  }
}

RestartBearModal.propTypes = {
  restartBear: PropTypes.func
};

export default RestartBearModal;