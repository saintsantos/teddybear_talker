import React, { Component } from 'react';
import { Menu } from 'antd';
import Events from '../../containers/Events/Events.js';


class TopNav extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Menu
                mode="horizontal">
                <Menu.Item>
                    Tabil
                </Menu.Item>
                <Menu.Item>
                    Events
                </Menu.Item>
                <Menu.Item>
                    Audio
                </Menu.Item>
            </Menu>
        )
    }
}

export default TopNav;
