import React from "react";
import { Route } from "react-router-dom";

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? (
          <Component {...props} />
        ) : (
          <Route path="/chat" />
        )
      }
    />
  );
}

export default PublicRoute;
