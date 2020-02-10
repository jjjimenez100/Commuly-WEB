/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { loggedInRoutes } from './routes';
import { Navbar, Sidebar } from '../components';

class LoggedInView extends Component {
  state = {
    isSidebarOpen: false,
  };

  handleSidebarOpen = () =>
    this.setState(prevState => ({ isSidebarOpen: !prevState.isSidebarOpen }));

  render() {
    return (
      <div className="app">
        <Sidebar
          isSidebarOpen={this.state.isSidebarOpen}
          handleSidebarOpen={this.handleSidebarOpen}
        />
        <div className="container">
          <Navbar handleSidebarOpen={this.handleSidebarOpen} />
          <main className="main">
            <Switch>
              {loggedInRoutes.map(route => (
                <Route key={route.path} {...route} />
              ))}
            </Switch>
          </main>
        </div>
      </div>
    );
  }
}

export default LoggedInView;
