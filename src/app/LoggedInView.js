/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { Navbar, Sidebar } from '../components';

class LoggedInView extends Component {
  state = {
    isSidebarOpen: false,
  };

  handleSidebarOpen = () =>
    this.setState(prevState => ({ isSidebarOpen: !prevState.isSidebarOpen }));

  render() {
    console.log('josh was rendered');
    return (
      <div className="app">
        <Sidebar
          isSidebarOpen={this.state.isSidebarOpen}
          handleSidebarOpen={this.handleSidebarOpen}
        />
        <div className="container">
          <Navbar handleSidebarOpen={this.handleSidebarOpen} />
          <main className="main">{this.props.childComponent}</main>
        </div>
      </div>
    );
  }
}

export default LoggedInView;
