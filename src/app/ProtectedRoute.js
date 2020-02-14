import React from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import LoggedInView from './LoggedInView';

const renderComponentWithDefaultLayout = (Component, authenticated, authorized, props) => {
  if (authenticated && authorized) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    const childComponent = <Component {...props} />;
    return <LoggedInView childComponent={childComponent} />;
  }
  return <Redirect to="/" />;
};

const ProtectedRoute = ({ component: Component, authenticated, authorized, ...rest }) => {
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={props =>
        renderComponentWithDefaultLayout(Component, authenticated, authorized, props)
      }
    />
  );
};

export default ProtectedRoute;
