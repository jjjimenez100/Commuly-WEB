/*
TODO:
1. Change way of importing icons
*/

import React, { Component } from 'react';
import MenuIcon from 'assets/icons/menu.svg';
import NotifIcon from 'assets/icons/notification.svg';
import ArrowDownIcon from 'assets/icons/arrow-down.svg';
import TempAvatar from 'assets/images/avatar.jpg';

class Navbar extends Component {
  render() {
    const { handleSidebarOpen } = this.props;
    return (
      <nav className="navigation">
        <button type="button" className="navigation-button" onClick={handleSidebarOpen}>
          <img src={MenuIcon} alt="menu-icon" />
        </button>
        <div className="navigation-right">
          <button type="button" className="navigation-button notification">
            <img src={NotifIcon} alt="notif" className="notification-icon" />
          </button>
          <button type="button" className="navigation-button avatar">
            <img src={TempAvatar} alt="avatar" className="avatar-icon" />
            <img src={ArrowDownIcon} alt="arrow-down" className="avatar-arrow-down" />
          </button>
        </div>
      </nav>
    );
  }
}

export default Navbar;
