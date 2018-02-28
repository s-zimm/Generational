import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isAuth from './isAuth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        isAuth.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }}} />
    )} />
)

export default PrivateRoute;