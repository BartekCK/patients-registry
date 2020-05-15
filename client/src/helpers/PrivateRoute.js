import React from "react";
import {AuthContext} from "../context";
import {Redirect, Route} from "react-router-dom";

export const PrivateRoute = ({component: Component, ...rest}) => {
    const {authState} = React.useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={(props) => {
                if (authState.isAuthenticated)
                    return <Component {...props} />;
                else return <Redirect to='/zaloguj'/>;
            }}
        />
    );
};
