import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import appStore from '../../stores/appStore.js';

@observer
class TopNav extends Component {
    constructor(props) {
        super(props);
        this.history = this.props.history
        this.state = {
            active: 1
        }
    }

    handleNavClick = (value, active, e) => {
        //this.setState({active: active})
        appStore.navAway(active);
        this.history.push(value);
    }

    render() {
        return (
            <Menu pointing>
                <Menu.Item active={false} onClick={this.handleNavClick.bind(this, '/', 1)}>Tabil</Menu.Item>
                <Menu.Item active={appStore.activeTab === 1} onClick={this.handleNavClick.bind(this, '/', 1)}>Events</Menu.Item>
                <Menu.Item active={appStore.activeTab === 2} onClick={this.handleNavClick.bind(this, '/audio', 2)}>Audio</Menu.Item>
                <Menu.Item active={appStore.activeTab === 3} onClick={this.handleNavClick.bind(this, '/settings', 3)}>Settings</Menu.Item>
            </Menu>
        )
    }
}

TopNav.propTypes = {
    store: PropTypes.any,
    history: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired
    }).isRequired
}
export default withRouter(TopNav);
