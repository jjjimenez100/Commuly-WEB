/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routes } from './routes';
import { Navbar, Sidebar } from '../components';

class App extends Component {
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
            <Router>
              <Switch>
                {routes.map(route => (
                  <Route key={route.path} {...route} />
                ))}
              </Switch>
            </Router>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
