/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { routes } from './routes';
import ProtectedRoute from './ProtectedRoute';

class App extends Component {
  mapRoutes = () => {
    return routes.map(route => {
      if (route.isPublic) {
        return <Route key={route.path} {...route} />;
      }

      const isJWTTokenValid =
        this.props.store.user.verifyJWTToken() || this.props.store.user.authChange;
      return (
        <ProtectedRoute
          key={route.path}
          authenticated={isJWTTokenValid}
          path={route.path}
          component={route.component}
        />
      );
    });
  };

  render() {
    return (
      <>
        <Router>
          <Switch>{this.mapRoutes()}</Switch>
        </Router>
        <ToastContainer position={toast.POSITION.TOP_CENTER} hideProgressBar />
      </>
    );
  }
}

export default inject('store')(observer(App));
