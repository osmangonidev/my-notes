import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
  } from "react-router-dom";
import { IsLoggedContext } from '../../App';

function PrivateRoute({ children, ...rest }) {
    const logged=JSON.parse(sessionStorage.getItem('isLogged'))
    return (
      <Route
        {...rest}
        render={({ location }) =>
          logged? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
}

export default PrivateRoute;