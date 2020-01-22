import React, { Component } from 'react';
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
        <div className="app-container">
          <Navbar handleSidebarOpen={this.handleSidebarOpen} />
        </div>
      </div>
    );
  }
}

export default App;
