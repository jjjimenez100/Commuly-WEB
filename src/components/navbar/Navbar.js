/*
TODO:
1. Change way of importing icons
*/

import React, { Component } from 'react';
import { Button } from 'components';

import MenuIcon from 'assets/icons/menu.svg';
import NotifIcon from 'assets/icons/notification.svg';
import ArrowDownIcon from 'assets/icons/arrow-down.svg';
import TempAvatar from 'assets/images/avatar.jpg';

class Navbar extends Component {
  render() {
    const { handleSidebarOpen } = this.props;
    return (
      <nav className="navigation">
        <Button inline type="button" className="navigation-button" onClick={handleSidebarOpen}>
          <img src={MenuIcon} alt="menu-icon" />
        </Button>
        <div className="navigation-right">
          <Button inline type="button" className="navigation-button notification">
            <img src={NotifIcon} alt="notif" className="notification-icon" />
          </Button>
          <Button inline type="button" className="navigation-button avatar">
            <img src={TempAvatar} alt="avatar" className="avatar-icon" />
            <img src={ArrowDownIcon} alt="arrow-down" className="avatar-arrow-down" />
          </Button>
        </div>
      </nav>
    );
  }
}

export default Navbar;
