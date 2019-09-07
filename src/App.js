import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";

import "./App.css";
import isLoggedIn from "./utils/isLoggedIn";
import { LoginPage, HomePage, NotFoundPage } from "./pages";

const PrivateRoute = ({ component: Component, client, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return isLoggedIn() ? (
        <div>
          <Component {...props} client={client} />
        </div>
      ) : (
        (window.location = `/`)
      );
    }}
  />
);

function App() {
  return (
    <Router>
      <Switch>
        {isLoggedIn() ? (
          <Redirect from="/" exact to="/home" />
        ) : (
          <Route path="/" exact>
            <LoginPage />
          </Route>
        )}

        <PrivateRoute path="/home" exact component={HomePage} />
        <PrivateRoute path="/home/:id" exact component={HomePage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
