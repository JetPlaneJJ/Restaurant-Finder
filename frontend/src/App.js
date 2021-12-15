import React from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import AddReview from "./components/add-review";
import Restaurant from "./components/restaurant";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";

export default function App() {
  const [user, setUser] = React.useState(null);

  const logout = async () => {
    console.log("Logged out");
    setUser(null);
  };
  const login = async (user = null) => {
    console.log("Logged in as " + user);
    setUser(user);
  };
  // const handleRedirect = () => {};

  const logoutSection = (user) => (
      <btn onClick={logout} className="navbar-nav">
        Logout {user.name}
      </btn>
  );
  const loginSection = () => (
    <Link to={"/login"} className="navbar-nav">
      Login
    </Link>
  );

  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/restaurants" className="navbar-nav">
          Home
        </a>
        {user ? logoutSection(user) : loginSection()}
      </nav>

      <Switch>
        <Route
          exact
          path={["/", "/restaurants"]}
          component={RestaurantsList}
        />
        <Route
          path={"/restaurants/:id/review"}
          render={(props) => <AddReview {...props} user={user} />}
        />
        <Route
          path="/restaurants/:id"
          render={(props) => <Restaurant {...props} user={user} />}
        />
        <Route
          path="/login"
          render={(props) => <Login {...props} login={login} />}
        />
      </Switch>
    </Router>
  );
}
