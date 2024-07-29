import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth } from '../components/firebase';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!auth.currentUser;

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;