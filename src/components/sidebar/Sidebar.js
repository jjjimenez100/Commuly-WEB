/*
TODO:
1. Change way of importing icons
2. Change button and use reusable component instead
*/

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import classnames from 'classnames';
import { Button } from 'components';
import { HomeIcon, CalendarIcon, ResourcesIcon, ChallengesIcon, AnalyticsIcon } from 'assets/icons';
import TempAvatar from 'assets/images/avatar.jpg';

class Sidebar extends Component {
  state = {
    redirect: '',
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    const { isSidebarOpen } = this.props;
    const sidebarButtonClass = classnames('sidebar-button', {
      'sidebar-button-close': !isSidebarOpen,
      'sidebar-button-open': isSidebarOpen,
    });

    return (
      <aside className={`sidebar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-close'}`}>
        <Button variant="inline" className="sidebar-avatar">
          <img
            src={TempAvatar}
            alt="avatar"
            className={`avatar-icon ${isSidebarOpen ? 'avatar-open' : 'avatar-close'}`}
          />
        </Button>
        {isSidebarOpen && (
          <div className="sidebar-info">
            <p className="sidebar-info-username">Username</p>
            <div className="sidebar-info-statistics">
              <div className="statistic">
                <p>00</p>
                <p>STAT</p>
              </div>
              <div className="statistic">
                <p>00</p>
                <p>STAT</p>
              </div>
              <div className="statistic">
                <p>00</p>
                <p>STAT</p>
              </div>
            </div>
            <p className="sidebar-info-text">View Avatar Space</p>
          </div>
        )}
        <Button
          onClick={() =>
            this.setState({ redirect: '/dashboard' }, () => this.setState({ redirect: '' }))
          }
          variant="inline"
          className={sidebarButtonClass}
        >
          <img src={HomeIcon} alt="home-icon" />
          {isSidebarOpen && <p className="sidebar-button-text">Home</p>}
        </Button>
        <Button
          onClick={() =>
            this.setState({ redirect: '/calendar' }, () => this.setState({ redirect: '' }))
          }
          variant="inline"
          className={sidebarButtonClass}
        >
          <img src={CalendarIcon} alt="calendar-icon" />
          {isSidebarOpen && <p className="sidebar-button-text">Calendar</p>}
        </Button>
        <Button variant="inline" className={sidebarButtonClass}>
          <img src={ResourcesIcon} alt="resources-icon" />
          {isSidebarOpen && <p className="sidebar-button-text">Resources</p>}
        </Button>
        <Button variant="inline" className={sidebarButtonClass}>
          <img src={ChallengesIcon} alt="challenges-icon" />
          {isSidebarOpen && <p className="sidebar-button-text">Challenges</p>}
        </Button>
        <Button variant="inline" className={sidebarButtonClass}>
          <img src={AnalyticsIcon} alt="analytics-icon" />
          {isSidebarOpen && <p className="sidebar-button-text">Analytics</p>}
        </Button>
      </aside>
    );
  }
}

export default Sidebar;
