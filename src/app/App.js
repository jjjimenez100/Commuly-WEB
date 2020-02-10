/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { routes } from './routes';

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            {routes.map(route => {
              if (route.isPublic) return <Route key={route.path} {...route} />;
              return null;
            })}
          </Switch>
        </Router>
        <ToastContainer position={toast.POSITION.TOP_CENTER} hideProgressBar />
      </>
    );
  }
}

export default App;
