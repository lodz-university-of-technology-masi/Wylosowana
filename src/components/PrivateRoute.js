import {Redirect, Route} from "react-router-dom";
import React from "react";

export const PrivateRoute = ({component: Component, profile, auth, ...rest}) => {
    return <Route {...rest}
                  render={(props) => {
                      if (auth.isAuthenticated && auth.user.attributes.profile === profile) {
                          return <Component {...props} auth={auth}/>
                      } else if (auth.isAuthenticated && auth.user.attributes.profile !== profile) {
                          return <Redirect to={{pathname: "/"}}/>
                      } else {
                          return <Redirect to={{pathname: "/login"}}/>
                      }
                  }}/>
};