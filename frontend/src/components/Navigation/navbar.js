import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import appStore from '../../stores/appStore';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

@observer
class TopNav extends Component {
    constructor() {
        super();
    }

    handleNavClick = (e, { name }) => {
        if (name === 'Tabil') {
            name = 'Events'
        }
        appStore.navigate(name);
    }

    render() {
        return (
            <Menu pointing>
                <Menu.Item name='Tabil' onClick={this.handleNavClick}></Menu.Item>
                <Menu.Item name='Events' active={this.props.store.active === 'Events'} onClick={this.handleNavClick}></Menu.Item>
                <Menu.Item name='Audio' active={this.props.store.active === 'Audio'} onClick={this.handleNavClick}></Menu.Item>
            </Menu>
        )
    }
}

TopNav.propTypes = {
    store: PropTypes.any
}
export default TopNav;
