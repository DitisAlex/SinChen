import React from 'react';
import { Route, Redirect } from 'react-router';

export default function ProtectedUserRoute({ component: Component, isAuthenticated, ...rest }) {
    return (
        <Route {...rest} render={
            props => {
                if (isAuthenticated) {
                    return <Component {...rest} {...props} />
                } else {
                    return <Redirect to={
                        {
                            pathname: '/unauthorized',
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }
        } />
    )
}