import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Main from "../components/layout/Main";

export default function UserRoute(props) {
  const { isLoggedIn, Component, path } = props;
  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedIn ? (
          <Main>
            <Component />
          </Main>
        ) : (
          <Redirect to="/sign-in" />
        );
      }}
    />
  );
}
