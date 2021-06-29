import React from 'react';
import { Route, Redirect } from 'react-router';

export default function ProtectedAdminRoute({ component: Component, isAdmin, ...rest }) {
    return (
        <Route {...rest} render={
            props => {
                if (isAdmin) {
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