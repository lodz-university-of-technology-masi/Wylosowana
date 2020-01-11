import {Redirect, Route} from "react-router-dom";
import React from "react";

export const PrivateRoute = ({component: Component, profile, auth, ...rest}) => {
    return <Route {...rest}
                  render={(props) => {
                      if (auth.isAuthenticated && (auth.user.hasOwnProperty('attributes') ? auth.user.attributes.profile === profile : auth.user.challengeParam.userAttributes.profile === profile)) {
                          return <Component {...props} auth={auth}/>
                      } else if (auth.isAuthenticated && (auth.user.hasOwnProperty('attributes') ? auth.user.attributes.profile !== profile : auth.user.challengeParam.userAttributes.profile !== profile)) {
                          return <Redirect to={{pathname: "/"}}/>
                      } else {
                          return <Redirect to={{pathname: "/login"}}/>
                      }
                  }}/>
};